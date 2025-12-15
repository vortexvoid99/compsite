// compsite-project/functions/r2-images/[...key].ts

import { Env, jsonResponse } from '../api/utils';

// This function acts as a proxy to serve images from the R2 bucket
export const onRequest: PagesFunction<Env> = async (context) => {
    const { env, params } = context;
    const r2 = env.R2_BUCKET;
    
    // The key is the path after /r2-images/
    const key = params.key.join('/');

    try {
        const object = await r2.get(key);

        if (object === null) {
            return jsonResponse({ error: 'Image not found' }, 404);
        }

        const headers = new Headers();
        object.writeHttpMetadata(headers);
        headers.set('etag', object.httpEtag);
        headers.set('Cache-Control', 'public, max-age=86400'); // Cache for 1 day

        return new Response(object.body, {
            headers,
        });

    } catch (error) {
        console.error('R2 Proxy error:', error);
        return jsonResponse({ error: 'Internal Server Error' }, 500);
    }
};
