import type { APIRoute } from 'astro';
import { getItems, approveReview, rejectReview, type Review } from '../../../lib/storage';
import { parse as parseCookie } from 'cookie';

// Check if user is authenticated
function isAuthenticated(request: Request): boolean {
    const cookieHeader = request.headers.get('cookie');
    if (!cookieHeader) return false;

    const cookies = parseCookie(cookieHeader);
    return cookies.auth === 'true';
}

// GET: Fetch all reviews (including pending)
export const GET: APIRoute = async ({ request }) => {
    if (!isAuthenticated(request)) {
        return new Response(JSON.stringify({ error: 'Nicht autorisiert' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        const allReviews = await getItems<Review>('reviews');
        const sortedReviews = allReviews.sort((a, b) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        return new Response(JSON.stringify(sortedReviews), {
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

// POST: Approve or reject a review
export const POST: APIRoute = async ({ request }) => {
    if (!isAuthenticated(request)) {
        return new Response(JSON.stringify({ error: 'Nicht autorisiert' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        const data = await request.json();
        const { reviewId, action } = data;

        if (!reviewId || !action) {
            return new Response(JSON.stringify({ error: 'Review-ID und Aktion erforderlich' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        if (action === 'approve') {
            await approveReview(reviewId);
        } else if (action === 'reject') {
            await rejectReview(reviewId);
        } else {
            return new Response(JSON.stringify({ error: 'Ungültige Aktion' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error updating review:', error);
        return new Response(JSON.stringify({ error: 'Fehler beim Aktualisieren der Bewertung' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
