// compsite-project/functions/api/competitions.ts

import { Env, jsonResponse, handleOptions } from './utils';

// This function handles GET requests for public competition listings
export const onRequest: PagesFunction<Env> = async (context) => {
    if (context.request.method === 'OPTIONS') {
        return handleOptions();
    }

    if (context.request.method === 'GET') {
        try {
            const { env } = context;
            const db = env.DB;

            // Select all published competitions, excluding sensitive fields
            // Order by end_at to show upcoming/active first
            const { results } = await db.prepare(`
                SELECT 
                    id, slug, title, description, image_reference, 
                    start_at, end_at, puzzle_type, puzzle_question, 
                    published, created_at, updated_at
                FROM competitions 
                WHERE published = 1
                ORDER BY end_at ASC
            `).all();

            return jsonResponse(results);

        } catch (error) {
            console.error('Public GET error:', error);
            return jsonResponse({ error: 'Internal Server Error', details: error.message }, 500);
        }
    }

    return jsonResponse({ error: 'Method Not Allowed' }, 405);
};
