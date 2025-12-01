# Image Upload Fix - Technische Dokumentation

**Projekt:** AtelierAL Website  
**Datum:** 30. November 2025  
**Status:** ✅ Erfolgreich behoben und deployed

---

## Inhaltsverzeichnis

1. [Problem-Analyse](#problem-analyse)
2. [Lösungen](#lösungen)
3. [Technische Details](#technische-details)
4. [Netzwerk-Architektur](#netzwerk-architektur)
5. [Upload-Ablauf](#upload-ablauf)
6. [Deployment](#deployment)
7. [Zusammenfassung](#zusammenfassung)

---

## Problem-Analyse

### Ursprüngliches Problem
Der Image-Upload auf der Website schlug fehl mit dem Fehler **"signal is aborted without reason"**. Hochgeladene Bilder waren korrupt und konnten nicht angezeigt werden.

### Identifizierte Ursachen

1. **Netzwerk-Problem**
   - Apache Reverse Proxy lief auf dem Proxmox Host (10.1.3.10)
   - LXC Container (10.1.3.99) konnte den Proxmox Host nicht erreichen
   - Requests kamen nie beim Node.js Server an

2. **Timeout-Problem**
   - Standard-Timeouts (30-60 Sekunden) waren zu kurz
   - Große Dateien (>5MB) führten zu Timeouts
   - Langsame Internetverbindungen wurden nicht berücksichtigt

3. **Chunk-Reihenfolge-Problem**
   - FormData sendete die Datei VOR den Metadaten
   - Busboy verarbeitete Events in Ankunftsreihenfolge
   - Variablen (chunkIndex, totalChunks, filename) waren undefined beim Schreiben
   - Resultat: Korrupte Dateien mit falschen Namen

4. **Buffering-Problem**
   - Apache bufferte Upload-Requests komplett im RAM
   - Bei großen Dateien führte dies zu Timeouts
   - Keine Streaming-Unterstützung

---

## Lösungen

### Lösung 1: Apache in LXC Container installieren

**Was wurde gemacht:**
- Apache wurde direkt in der LXC Container (10.1.3.99) installiert
- SSL-Zertifikat von Let's Encrypt konfiguriert
- Apache als Reverse Proxy vor Node.js (localhost:3000)

**Warum:**
- Proxmox Host war nicht erreichbar
- Einfacher: Apache und Node.js im selben Container
- Bessere Performance: Kein Netzwerk-Hop

**Technische Umsetzung:**
```bash
# Apache installieren
apt install -y apache2

# SSL-Zertifikat
certbot --apache -d test-danapfel-digital.de

# Module aktivieren
a2enmod proxy proxy_http ssl headers rewrite
```

### Lösung 2: Chunked Upload implementiert

**Was wurde gemacht:**
- Upload in 128KB Chunks aufgeteilt
- Jeder Chunk wird einzeln hochgeladen
- Fortschrittsanzeige: "X/Y Chunks"

**Warum:**
- Vermeidet Timeout bei großen Dateien
- Memory-effizient (nicht ganze Datei im RAM)
- Fehlertoleranz (einzelne Chunks wiederholbar)
- Bessere User Experience (Fortschritt sichtbar)

**Code (Frontend):**
```typescript
const CHUNK_SIZE = 128 * 1024; // 128KB
const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
    const start = chunkIndex * CHUNK_SIZE;
    const end = Math.min(start + CHUNK_SIZE, file.size);
    const chunk = file.slice(start, end);
    
    const formData = new FormData();
    // KRITISCH: Felder ZUERST, dann Datei!
    formData.append("chunkIndex", chunkIndex.toString());
    formData.append("totalChunks", totalChunks.toString());
    formData.append("filename", uniqueFilename);
    formData.append("file", chunk);
    
    await fetch("/api/upload", {
        method: "POST",
        body: formData,
        signal: controller.signal, // 120s Timeout
    });
}
```

### Lösung 3: FormData-Reihenfolge korrigiert

**Das Problem:**
Busboy verarbeitet Multipart-Events in der Reihenfolge, wie sie ankommen:
1. Datei kommt zuerst → `file` Event wird gefeuert
2. Variablen sind noch `undefined`
3. Datei wird mit falschen Werten gespeichert

**Die Lösung:**
```typescript
// ❌ FALSCH:
formData.append("file", chunk);           // Datei zuerst
formData.append("chunkIndex", "0");       // Metadaten danach

// ✅ RICHTIG:
formData.append("chunkIndex", "0");       // Metadaten ZUERST
formData.append("totalChunks", "5");
formData.append("filename", "bild.png");
formData.append("file", chunk);           // Datei DANACH
```

**Warum funktioniert das:**
Busboy feuert Events in dieser Reihenfolge:
1. `field` Event für `chunkIndex` → Variable gesetzt
2. `field` Event für `totalChunks` → Variable gesetzt
3. `field` Event für `filename` → Variable gesetzt
4. `file` Event → Alle Variablen korrekt!

### Lösung 4: Backend mit Busboy Streaming

**Was wurde gemacht:**
- Busboy für Streaming-Multipart-Parsing
- Direktes Schreiben auf Disk (kein RAM-Buffering)
- Append-Modus für Chunks

**Code (Backend):**
```typescript
import Busboy from 'busboy';

let chunkIndex = 0;
let totalChunks = 1;
let filename = '';

const busboy = Busboy({ headers: request.headers });

// Metadaten empfangen
busboy.on('field', (fieldname, val) => {
    if (fieldname === 'chunkIndex') chunkIndex = parseInt(val);
    if (fieldname === 'totalChunks') totalChunks = parseInt(val);
    if (fieldname === 'filename') filename = val;
});

// Datei-Stream empfangen
busboy.on('file', (fieldname, file, info) => {
    const tempFilePath = join(tempDir, filename);
    const writeStream = createWriteStream(tempFilePath, { 
        flags: 'a'  // Append für Chunks
    });
    
    file.pipe(writeStream);
    
    writeStream.on('finish', () => {
        if (chunkIndex === totalChunks - 1) {
            // Letzter Chunk → Datei verschieben
            renameSync(tempFilePath, finalPath);
        }
    });
});
```

