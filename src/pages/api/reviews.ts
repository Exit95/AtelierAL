import type { APIRoute } from 'astro';
import { getItems, saveItem, type Review } from '../../lib/storage';

// GET: Fetch all approved reviews
export const GET: APIRoute = async () => {
    try {
        const allReviews = await getItems<Review>('reviews');
        const approvedReviews = allReviews
            .filter(review => review.status === 'approved')
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        return new Response(JSON.stringify(approvedReviews), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error fetching reviews:', error);
        return new Response(JSON.stringify({ error: 'Fehler beim Laden der Bewertungen' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};

// POST: Submit a new review
export const POST: APIRoute = async ({ request }) => {
    try {
        const data = await request.json();

        // Validation
        if (!data.name || !data.rating || !data.text) {
            return new Response(JSON.stringify({ error: 'Bitte füllen Sie alle Pflichtfelder aus.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Validate rating
        const rating = typeof data.rating === 'string' ? parseInt(data.rating) : data.rating;
        if (isNaN(rating) || rating < 1 || rating > 5) {
            return new Response(JSON.stringify({ error: 'Bewertung muss zwischen 1 und 5 Sternen liegen.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Validate name length
        if (data.name.length < 2 || data.name.length > 100) {
            return new Response(JSON.stringify({ error: 'Name muss zwischen 2 und 100 Zeichen lang sein.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Validate text length
        if (data.text.length < 10 || data.text.length > 1000) {
            return new Response(JSON.stringify({ error: 'Bewertungstext muss zwischen 10 und 1000 Zeichen lang sein.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Validate email if provided
        if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            return new Response(JSON.stringify({ error: 'Bitte geben Sie eine gültige E-Mail-Adresse an.' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Create review object
        const reviewId = `review-${Date.now()}`;
        const review: Review = {
            id: reviewId,
            name: data.name.trim(),
            email: data.email ? data.email.trim() : undefined,
            rating,
            text: data.text.trim(),
            date: new Date().toISOString(),
            status: 'pending' // Requires admin approval
        };

        // Save review
        await saveItem('reviews', reviewId, review);

        return new Response(JSON.stringify({
            success: true,
            message: 'Vielen Dank für Ihre Bewertung! Sie wird nach Prüfung veröffentlicht.'
        }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error submitting review:', error);
        return new Response(JSON.stringify({ error: 'Fehler beim Speichern der Bewertung' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
