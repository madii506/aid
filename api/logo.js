// Proxies a nonprofit's own logo so the register identifies each organisation
// the way any donation directory does. Tries the org's brand logo first, then
// its site icon. Returns 404 when there is none — the page then falls back to
// the lettermark it already draws.
const SOURCES = (d) => [
  `https://logo.clearbit.com/${d}?size=256`,
  `https://www.google.com/s2/favicons?domain=${d}&sz=256`,
  `https://icons.duckduckgo.com/ip3/${d}.ico`,
];

module.exports = async (req, res) => {
  const d = String((req.query && req.query.d) || '')
    .toLowerCase()
    .replace(/[^a-z0-9.-]/g, '');

  if (!d || d.indexOf('.') < 0 || d.length > 80) {
    res.status(400).json({ error: 'bad domain' });
    return;
  }

  for (const url of SOURCES(d)) {
    try {
      const ctl = new AbortController();
      const timer = setTimeout(() => ctl.abort(), 4500);
      const r = await fetch(url, {
        signal: ctl.signal,
        headers: { 'user-agent': 'Mozilla/5.0 (compatible; AID/1.0)' },
      });
      clearTimeout(timer);
      if (!r.ok) continue;

      const type = r.headers.get('content-type') || '';
      if (!/^image\//.test(type)) continue;

      const buf = Buffer.from(await r.arrayBuffer());
      if (buf.length < 220) continue;            // placeholder / blank icon

      res.setHeader('content-type', type);
      res.setHeader('cache-control', 'public, s-maxage=604800, stale-while-revalidate=86400');
      res.setHeader('x-logo-source', url.split('/')[2]);
      res.status(200).send(buf);
      return;
    } catch (e) { /* try the next source */ }
  }

  res.setHeader('cache-control', 'public, s-maxage=3600');
  res.status(404).json({ error: 'no logo for ' + d });
};
