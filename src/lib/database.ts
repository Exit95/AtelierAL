import Database from 'better-sqlite3';
import path from 'node:path';
import fs from 'node:fs';

const DB_PATH = process.env.DB_PATH || path.join(process.cwd(), 'data', 'atelierkl.db');

// Ensure data directory exists
const dbDir = path.dirname(DB_PATH);
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

let db: Database.Database;

function getDb(): Database.Database {
    if (!db) {
        db = new Database(DB_PATH);
        db.pragma('journal_mode = WAL');
        db.pragma('foreign_keys = ON');
        db.pragma('busy_timeout = 5000');
        initSchema();
    }
    return db;
}

function initSchema(): void {
    const database = db;

    database.exec(`
        CREATE TABLE IF NOT EXISTS artworks (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            description TEXT,
            technique TEXT,
            width REAL,
            height REAL,
            size_unit TEXT DEFAULT 'cm',
            availability TEXT DEFAULT 'available' CHECK(availability IN ('available', 'reserved', 'sold')),
            price TEXT,
            images TEXT DEFAULT '[]',
            tags TEXT DEFAULT '[]',
            featured INTEGER DEFAULT 0,
            created_date TEXT,
            updated_at TEXT DEFAULT (datetime('now'))
        );

        CREATE TABLE IF NOT EXISTS workshops (
            id TEXT PRIMARY KEY,
            title TEXT NOT NULL,
            description TEXT,
            date TEXT,
            time TEXT,
            duration TEXT,
            location TEXT,
            max_participants INTEGER DEFAULT 10,
            current_participants INTEGER DEFAULT 0,
            materials TEXT DEFAULT '[]',
            price REAL DEFAULT 0,
            image TEXT,
            booking_enabled INTEGER DEFAULT 1,
            created_at TEXT DEFAULT (datetime('now')),
            updated_at TEXT DEFAULT (datetime('now'))
        );

        CREATE TABLE IF NOT EXISTS workshop_bookings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            workshop_id TEXT NOT NULL,
            customer_name TEXT NOT NULL,
            customer_email TEXT NOT NULL,
            customer_phone TEXT,
            participants INTEGER DEFAULT 1,
            message TEXT,
            status TEXT DEFAULT 'confirmed' CHECK(status IN ('confirmed', 'cancelled', 'pending')),
            created_at TEXT DEFAULT (datetime('now')),
            FOREIGN KEY (workshop_id) REFERENCES workshops(id) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS reviews (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT,
            rating INTEGER NOT NULL CHECK(rating BETWEEN 1 AND 5),
            text TEXT NOT NULL,
            date TEXT DEFAULT (datetime('now')),
            status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'approved', 'rejected'))
        );

        CREATE TABLE IF NOT EXISTS contact_inquiries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT,
            preferred_date TEXT,
            message TEXT NOT NULL,
            type TEXT DEFAULT 'contact' CHECK(type IN ('contact', 'artwork_inquiry', 'commission')),
            artwork_id TEXT,
            created_at TEXT DEFAULT (datetime('now'))
        );

        CREATE TABLE IF NOT EXISTS images (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            filename TEXT NOT NULL UNIQUE,
            original_name TEXT,
            mime_type TEXT,
            size INTEGER,
            s3_url TEXT,
            created_at TEXT DEFAULT (datetime('now'))
        );
    `);
}

// Artwork operations
export function getAllArtworks(): any[] {
    const rows = getDb().prepare('SELECT * FROM artworks ORDER BY created_date DESC').all();
    return rows.map(parseArtworkRow);
}

export function getArtwork(id: string): any | null {
    const row = getDb().prepare('SELECT * FROM artworks WHERE id = ?').get(id);
    return row ? parseArtworkRow(row) : null;
}

export function getFeaturedArtworks(): any[] {
    const rows = getDb().prepare('SELECT * FROM artworks WHERE featured = 1 ORDER BY created_date DESC').all();
    return rows.map(parseArtworkRow);
}

export function saveArtwork(artwork: any): void {
    const stmt = getDb().prepare(`
        INSERT OR REPLACE INTO artworks (id, title, description, technique, width, height, size_unit, availability, price, images, tags, featured, created_date, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
    `);
    stmt.run(
        artwork.id,
        artwork.title,
        artwork.description,
        artwork.technique,
        artwork.size?.width,
        artwork.size?.height,
        artwork.size?.unit || 'cm',
        artwork.availability,
        artwork.price,
        JSON.stringify(artwork.images || []),
        JSON.stringify(artwork.tags || []),
        artwork.featured ? 1 : 0,
        artwork.createdDate
    );
}

export function deleteArtwork(id: string): void {
    getDb().prepare('DELETE FROM artworks WHERE id = ?').run(id);
}

// Workshop operations
export function getAllWorkshops(): any[] {
    const rows = getDb().prepare('SELECT * FROM workshops ORDER BY date ASC').all();
    return rows.map(parseWorkshopRow);
}

export function getWorkshop(id: string): any | null {
    const row = getDb().prepare('SELECT * FROM workshops WHERE id = ?').get(id);
    return row ? parseWorkshopRow(row) : null;
}

export function saveWorkshop(workshop: any): void {
    const stmt = getDb().prepare(`
        INSERT OR REPLACE INTO workshops (id, title, description, date, time, duration, location, max_participants, current_participants, materials, price, image, booking_enabled, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
    `);
    stmt.run(
        workshop.id,
        workshop.title,
        workshop.description,
        workshop.date,
        workshop.time,
        workshop.duration,
        workshop.location,
        workshop.maxParticipants,
        workshop.currentParticipants || 0,
        JSON.stringify(workshop.materials || []),
        workshop.price,
        workshop.image,
        workshop.bookingEnabled ? 1 : 0
    );
}

export function deleteWorkshop(id: string): void {
    getDb().prepare('DELETE FROM workshops WHERE id = ?').run(id);
}

// Workshop Booking operations
export function createWorkshopBooking(booking: any): number {
    const stmt = getDb().prepare(`
        INSERT INTO workshop_bookings (workshop_id, customer_name, customer_email, customer_phone, participants, message)
        VALUES (?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
        booking.workshopId,
        booking.name,
        booking.email,
        booking.phone,
        booking.participants || 1,
        booking.message
    );

    // Update current_participants
    getDb().prepare(`
        UPDATE workshops SET current_participants = current_participants + ?
        WHERE id = ?
    `).run(booking.participants || 1, booking.workshopId);

    return Number(result.lastInsertRowid);
}

export function getWorkshopBookings(workshopId: string): any[] {
    return getDb().prepare('SELECT * FROM workshop_bookings WHERE workshop_id = ? ORDER BY created_at DESC').all(workshopId) as any[];
}

// Review operations
export function getAllReviews(): any[] {
    return getDb().prepare('SELECT * FROM reviews ORDER BY date DESC').all() as any[];
}

export function getApprovedReviews(): any[] {
    return getDb().prepare("SELECT * FROM reviews WHERE status = 'approved' ORDER BY date DESC").all() as any[];
}

export function saveReview(review: any): void {
    const stmt = getDb().prepare(`
        INSERT OR REPLACE INTO reviews (id, name, email, rating, text, date, status)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(
        review.id,
        review.name,
        review.email || null,
        review.rating,
        review.text,
        review.date || new Date().toISOString(),
        review.status || 'pending'
    );
}

export function approveReview(id: string): void {
    getDb().prepare("UPDATE reviews SET status = 'approved' WHERE id = ?").run(id);
}

export function rejectReview(id: string): void {
    getDb().prepare("UPDATE reviews SET status = 'rejected' WHERE id = ?").run(id);
}

export function deleteReview(id: string): void {
    getDb().prepare('DELETE FROM reviews WHERE id = ?').run(id);
}

// Contact Inquiry operations
export function saveContactInquiry(inquiry: any): number {
    const stmt = getDb().prepare(`
        INSERT INTO contact_inquiries (name, email, phone, preferred_date, message, type, artwork_id)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
        inquiry.name,
        inquiry.email,
        inquiry.phone,
        inquiry.preferredDate,
        inquiry.message,
        inquiry.type || 'contact',
        inquiry.artworkId
    );
    return Number(result.lastInsertRowid);
}

// Image operations
export function saveImage(image: any): number {
    const stmt = getDb().prepare(`
        INSERT INTO images (filename, original_name, mime_type, size, s3_url)
        VALUES (?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
        image.filename,
        image.originalName,
        image.mimeType,
        image.size,
        image.s3Url
    );
    return Number(result.lastInsertRowid);
}

export function getAllImages(): any[] {
    return getDb().prepare('SELECT * FROM images ORDER BY created_at DESC').all() as any[];
}

// Helper functions
function parseArtworkRow(row: any): any {
    return {
        id: row.id,
        title: row.title,
        description: row.description,
        technique: row.technique,
        size: {
            width: row.width,
            height: row.height,
            unit: row.size_unit
        },
        availability: row.availability,
        price: row.price,
        images: JSON.parse(row.images || '[]'),
        tags: JSON.parse(row.tags || '[]'),
        featured: Boolean(row.featured),
        createdDate: row.created_date
    };
}

function parseWorkshopRow(row: any): any {
    return {
        id: row.id,
        title: row.title,
        description: row.description,
        date: row.date,
        time: row.time,
        duration: row.duration,
        location: row.location,
        maxParticipants: row.max_participants,
        currentParticipants: row.current_participants,
        materials: JSON.parse(row.materials || '[]'),
        price: row.price,
        image: row.image,
        bookingEnabled: Boolean(row.booking_enabled)
    };
}

// Cleanup on process exit
process.on('exit', () => {
    if (db) db.close();
});
