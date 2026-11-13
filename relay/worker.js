// Calendar relay for Executive Desk. Deploy as a Cloudflare Worker.
// Settings > Variables and Secrets:
//   ACCESS_KEY      (required) any long random string; enter the same key in the app's Setup
//   ALLOWED_ORIGIN  (recommended) the address of the site hosting the app, e.g. https://desk.example.com
// The relay forwards a calendar link to its provider and returns the result.
// It does not store or log calendar links or calendar contents.
const HOSTS = ["google.com", "office365.com", "office.com", "outlook.com", "live.com", "icloud.com"];
const allowed = (u) => u.protocol === "https:" && HOSTS.some((h) => u.hostname === h || u.hostname.endsWith("." + h));

export default {
  async fetch(req, env) {
    const cors = {
      "access-control-allow-origin": env.ALLOWED_ORIGIN || "*",
      "access-control-allow-headers": "x-desk-key",
      vary: "origin",
    };
    if (req.method === "OPTIONS") return new Response(null, { headers: cors });
    if (!env.ACCESS_KEY || req.headers.get("x-desk-key") !== env.ACCESS_KEY)
      return new Response("Unauthorized", { status: 401, headers: cors });

    let u;
    try {
      u = new URL(new URL(req.url).searchParams.get("url").replace(/^webcal:/i, "https:"));
    } catch (e) {
      return new Response("Bad link", { status: 400, headers: cors });
    }
    if (!allowed(u)) return new Response("Calendar host not allowed", { status: 403, headers: cors });

    const r = await fetch(u, { headers: { "user-agent": "ExecutiveDesk/1.0" }, redirect: "follow" });
    if (!allowed(new URL(r.url))) return new Response("Redirect not allowed", { status: 403, headers: cors });
    const text = (await r.text()).slice(0, 5000000);
    return new Response(text, {
      status: r.ok ? 200 : 502,
      headers: { ...cors, "content-type": "text/calendar; charset=utf-8", "cache-control": "no-store" },
    });
  },
};
