# Upload-Debugging Checkliste

## Problem
Bild-Uploads schlagen fehl mit `ECONNRESET` Fehler.

## Mögliche Ursachen
1. **Datei zu groß** - Node.js hat standardmäßig ein 1MB Limit
2. **Upload Timeout** - Verbindung bricht ab bei langen Uploads
3. **Reverse Proxy Limit** - Falls ein Proxy/Loadbalancer davor ist

## Logs vom Server
```
2025-11-29T22:02:05: ❌ Upload error: Error: aborted
    at abortIncoming (node:_http_server:796:17)
    code: 'ECONNRESET'
```

## Nächste Schritte
1. Teste mit kleinem Bild (< 100KB)
2. Prüfe Browser Console für genaue Fehlermeldung
3. Falls nötig: Astro body parser Limit erhöhen

## Potentielle Lösung
In `astro.config.local.mjs` body size limit erhöhen:
```javascript
export default defineConfig({
  server: {
    // Increase body size limit
    host: true,
    bodyLimit: 10 * 1024 * 1024 // 10MB
  }
});
```
