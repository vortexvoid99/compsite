// compsite-project/functions/r2-images/[[catchall]].ts

import { Env } from "../api/utils";

export const onRequest: PagesFunction<Env> = async (context) => {
    const { request, env, params } = context;
    const { key } = params;

    if (request.method !== "GET") {
        return new Response("Method Not Allowed", { status: 405 });
    }

    if (!key || typeof key !== "string") {
        return new Response("Invalid key", { status: 400 });
    }

    // The key from the URL is an array of path segments. Join them to get the full R2 key.
    const r2Key = key.join("/");

    try {
        const object = await env.R2_BUCKET.get(r2Key);

        if (object === null) {
            return new Response("Object Not Found", { status: 404 });
        }

        const headers = new Headers();
        object.writeHttpMetadata(headers);
        headers.set("etag", object.httpEtag);

        return new Response(object.body, {
            headers,
        });
    } catch (error) {
        console.error("Error fetching from R2:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
};
