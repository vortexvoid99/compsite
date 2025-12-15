// compsite-project/functions/api/admin/competitions.ts

import { Env, jsonResponse, handleOptions, slugify, hashAnswer, AdminCompetitionData } from '../utils';

// This function handles both POST (create) and GET (list all) requests
export const onRequest: PagesFunction<Env> = async (context) => {
    if (context.request.method === 'OPTIONS') {
        return handleOptions();
    }

    const { request, env } = context;
    const db = env.DB;
    const r2 = env.R2_BUCKET;

    if (request.method === 'POST') {
        try {
            // 1. Parse the multipart form data
            const formData = await request.formData();
            
            // Extract fields
            const title = formData.get('title')?.toString() || '';
            const description = formData.get('description')?.toString() || '';
            const start_at = formData.get('start_at')?.toString() || '';
            const end_at = formData.get('end_at')?.toString() || '';
            const published = formData.get('published') === 'true' ? 1 : 0;
            const puzzle_question = formData.get('puzzle_question')?.toString() || null;
            const puzzle_answer = formData.get('puzzle_answer')?.toString() || null;
            const imageFile = formData.get('image_file') as File | null;

            // Basic validation
            if (!title || !description || !start_at || !end_at || !imageFile) {
                return jsonResponse({ error: 'Missing required fields: title, description, start_at, end_at, and image_file.' }, 400);
            }

            // 2. Prepare data
            const slug = slugify(title);
            let image_reference = '';
            let puzzle_hashed_answer = null;

            // 3. Handle Image Upload to R2
            if (imageFile && imageFile.size > 0) {
                const fileExtension = imageFile.name.split('.').pop();
                const r2Key = `competition-images/${slug}-${Date.now()}.${fileExtension}`;
                
                await r2.put(r2Key, imageFile.stream());
                image_reference = r2Key;
            } else {
                return jsonResponse({ error: 'Image file is required.' }, 400);
            }

            // 4. Handle Puzzle Hashing
            if (puzzle_question && puzzle_answer) {
                // Note: Cloudflare Pages Functions environment provides the crypto API
                puzzle_hashed_answer = await hashAnswer(puzzle_answer);
            }

            // 5. Insert into D1
            const stmt = db.prepare(`
                INSERT INTO competitions (
                    slug, title, description, image_reference, start_at, end_at, 
                    puzzle_type, puzzle_question, puzzle_hashed_answer, published
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `);

            const result = await stmt.bind(
                slug, title, description, image_reference, start_at, end_at,
                puzzle_question ? 'text' : null, // Simple type for now, can be expanded
                puzzle_question, puzzle_hashed_answer, published
            ).run();

            if (result.success) {
                return jsonResponse({ 
                    message: 'Competition created successfully', 
                    slug: slug,
                    result: result 
                }, 201);
            } else {
                // If the insert failed, attempt to clean up the R2 object
                await r2.delete(image_reference);
                return jsonResponse({ error: 'Failed to create competition in database', details: result.error }, 500);
            }

        } catch (error) {
            console.error('Admin POST error:', error);
            return jsonResponse({ error: 'Internal Server Error', details: error.message }, 500);
        }
    }

    if (request.method === 'GET') {
        try {
            // List all competitions for admin view
            const { results } = await db.prepare('SELECT * FROM competitions ORDER BY created_at DESC').all();
            return jsonResponse(results);
        } catch (error) {
            console.error('Admin GET error:', error);
            return jsonResponse({ error: 'Internal Server Error', details: error.message }, 500);
        }
    }

    return jsonResponse({ error: 'Method Not Allowed' }, 405);
};
