// compsite-project/functions/api/competitions/[slug].ts

import { Env, jsonResponse, handleOptions, hashAnswer } from '../utils';
import { Competition } from '../utils';

// This function handles GET requests for a single competition and POST for puzzle answer check
export const onRequest: PagesFunction<Env> = async (context) => {
    if (context.request.method === 'OPTIONS') {
        return handleOptions();
    }

    const { request, env, params } = context;
    const db = env.DB;
    const slug = params.slug as string;

    if (request.method === 'GET') {
        try {
            // Fetch a single published competition by slug
            const stmt = db.prepare(`
                SELECT 
                    id, slug, title, description, image_reference, 
                    start_at, end_at, puzzle_type, puzzle_question, 
                    published, created_at, updated_at
                FROM competitions 
                WHERE slug = ? AND published = 1
            `);
            
            const competition = await stmt.bind(slug).first<Competition>();

            if (!competition) {
                return jsonResponse({ error: 'Competition not found or not published' }, 404);
            }

            return jsonResponse(competition);

        } catch (error) {
            console.error('Public GET [slug] error:', error);
            return jsonResponse({ error: 'Internal Server Error', details: error.message }, 500);
        }
    }

    if (request.method === 'POST') {
        try {
            const { answer } = await request.json();

            if (!answer) {
                return jsonResponse({ error: 'Missing answer in request body' }, 400);
            }

            // 1. Fetch the competition and its hashed answer
            const stmt = db.prepare(`
                SELECT puzzle_hashed_answer 
                FROM competitions 
                WHERE slug = ? AND published = 1
            `);
            
            const competition = await stmt.bind(slug).first<{ puzzle_hashed_answer: string | null }>();

            if (!competition) {
                return jsonResponse({ error: 'Competition not found or not published' }, 404);
            }

            const storedHash = competition.puzzle_hashed_answer;

            if (!storedHash) {
                return jsonResponse({ error: 'This competition does not have a puzzle' }, 400);
            }

            // 2. Hash the user's answer
            const submittedHash = await hashAnswer(answer);

            // 3. Compare hashes
            const isCorrect = submittedHash === storedHash;

            return jsonResponse({ isCorrect });

        } catch (error) {
            console.error('Public POST [slug] error:', error);
            return jsonResponse({ error: 'Internal Server Error', details: error.message }, 500);
        }
    }

    return jsonResponse({ error: 'Method Not Allowed' }, 405);
};
