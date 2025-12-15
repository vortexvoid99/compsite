import { Env, jsonResponse } from "./api/utils";

export const onRequestGet: PagesFunction<Env> = async ({ env, request }) => {
  const url = new URL(request.url);
  const key = url.searchParams.get("key");
  if (!key) return jsonResponse({ error: "Missing key" }, 400);

  const obj = await env.R2_BUCKET.get(key);
  if (!obj) return jsonResponse({ error: "Not found" }, 404);

  const headers = new Headers();
  obj.writeHttpMetadata(headers);
  headers.set("Cache-Control", "public, max-age=86400");
  return new Response(obj.body, { headers });
};
