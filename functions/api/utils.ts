// compsite-project/functions/api/utils.ts

/**
 * Generates a URL-friendly slug from a string.
 * @param text The input string (e.g., competition title).
 * @returns A clean, lowercase, hyphenated slug.
 */
export function slugify(text: string): string {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric characters except spaces and hyphens
        .replace(/[\s_-]+/g, '-')      // Replace spaces, underscores, and multiple hyphens with a single hyphen
        .replace(/^-+|-+$/g, '');     // Remove leading/trailing hyphens
}

/**
 * Helper function to create a standard JSON response.
 * @param body The response body object.
 * @param status The HTTP status code.
 * @returns A Response object.
 */
export function jsonResponse(body: any, status: number = 200): Response {
    return new Response(JSON.stringify(body), {
        status: status,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*', // Adjust in production for security
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
}

/**
 * Helper function to handle preflight OPTIONS requests.
 * @returns A Response object for preflight.
 */
export function handleOptions(): Response {
    return new Response(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '86400',
        },
    });
}

// Define the expected environment variables for type safety
export interface Env {
    DB: D1Database;
    R2_BUCKET: R2Bucket;
}

// Define the structure for a competition record
export interface Competition {
    id: number;
    slug: string;
    title: string;
    description: string;
    image_reference: string;
    start_at: string;
    end_at: string;
    puzzle_type: string | null;
    puzzle_question: string | null;
    puzzle_hashed_answer: string | null;
    published: 0 | 1;
    created_at: string;
    updated_at: string;
}

/**
 * Hashes a string using SHA-256.
 * @param text The string to hash.
 * @returns A promise that resolves to the hex string of the hash.
 */
export async function hashAnswer(text: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

// Define the structure for the data received from the admin form
export interface AdminCompetitionData {
    title: string;
    description: string;
    start_at: string;
    end_at: string;
    published: boolean;
    puzzle_type?: string;
    puzzle_question?: string;
    puzzle_answer?: string; // The raw answer to be hashed
    image_file?: File; // The image file from the form
}
