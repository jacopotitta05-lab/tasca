// Sincronizzazione di Tasca: salva i dati nel Netlify Blobs del sito.
// Protetta dal codice impostato nella variabile d'ambiente SYNC_PASSWORD.
import { getStore } from "@netlify/blobs";

const enc = new TextEncoder();
function sameSecret(a, b) {
  const x = enc.encode(a), y = enc.encode(b);
  let diff = x.length ^ y.length;
  for (let i = 0; i < Math.max(x.length, y.length); i++) diff |= (x[i] || 0) ^ (y[i] || 0);
  return diff === 0;
}
const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json", "cache-control": "no-store" } });

export default async (req) => {
  const secret = (globalThis.Netlify?.env?.get("SYNC_PASSWORD")) ?? process.env.SYNC_PASSWORD ?? "";
  if (secret.length < 8) return json({ error: "missing_password" }, 503);

  const auth = req.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!sameSecret(token, secret)) {
    await new Promise((r) => setTimeout(r, 400)); // rallenta i tentativi a caso
    return json({ error: "unauthorized" }, 401);
  }

  const store = getStore({ name: "tasca", consistency: "strong" });

  if (req.method === "GET") {
    const { blobs } = await store.list();
    const docs = {};
    await Promise.all(blobs.map(async (b) => { docs[b.key] = await store.get(b.key, { type: "json" }); }));
    return json({ docs });
  }

  if (req.method === "POST") {
    let body;
    try { body = await req.json(); } catch { return json({ error: "bad_json" }, 400); }
    const { bucket, data } = body || {};
    if (typeof bucket !== "string" || !/^(core|m-\d{4}-\d{2})$/.test(bucket)) return json({ error: "bad_bucket" }, 400);
    if (!data || typeof data !== "object" || Array.isArray(data)) return json({ error: "bad_data" }, 400);
    if (JSON.stringify(data).length > 2_000_000) return json({ error: "too_large" }, 413);
    await store.setJSON(bucket, data);
    return json({ ok: true });
  }

  return json({ error: "method_not_allowed" }, 405);
};

export const config = { path: "/api/sync" };
