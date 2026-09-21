// Proxies a nonprofit's own logo so the register identifies each organisation
// the way any donation directory does. Tries several public sources and keeps
// the largest image, so a row never falls back to a 16px favicon. Returns 404
// when there is nothing usable — the page then shows the lettermark it draws.

const SOURCES = (d) => [
  `https://${d}/apple-touch-icon.png`,
  `https://${d}/apple-touch-icon-precomposed.png`,
  `https://logo.clearbit.com/${d}?size=256`,
  `https://www.google.com/s2/favicons?domain=${d}&sz=256`,
  `https://icons.duckduckgo.com/ip3/${d}.ico`,
];

// Read the pixel width straight out of the file header — no image library.
function widthOf(buf, type) {
  try {
    if (buf.length > 24 && buf[0] === 0x89 && buf[1] === 0x50) {        // PNG
      return buf.readUInt32BE(16);
    }
    if (buf.length > 6 && buf[0] === 0 && buf[1] === 0 && buf[2] === 1) { // ICO
      return buf[6] === 0 ? 256 : buf[6];
    }
    if (buf.length > 4 && buf[0] === 0xff && buf[1] === 0xd8) {          // JPEG
      let i = 2;
      while (i < buf.length - 9) {
        if (buf[i] !== 0xff) { i++; continue; }
        const m = buf[i + 1];
        if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) {
          return buf.readUInt16BE(i + 7);
        }
        i += 2 + buf.readUInt16BE(i + 2);
      }
    }
    if (/svg/.test(type)) return 512;      // vector — always good enough
  } catch (e) { /* fall through */ }
  return 64;                                // unknown: assume usable, not ideal
}

module.exports = async (req, res) => {
  const d = String((req.query && req.query.d) || '')
    .toLowerCase().replace(/[^a-z0-9.-]/g, '');

  if (!d || d.indexOf('.') < 0 || d.length > 80) {
    res.status(400).json({ error: 'bad domain' });
    return;
  }

  let best = null;

  for (const url of SOURCES(d)) {
    try {
      const ctl = new AbortController();
      const timer = setTimeout(() => ctl.abort(), 4000);
      const r = await fetch(url, {
        signal: ctl.signal, redirect: 'follow',
        headers: { 'user-agent': 'Mozilla/5.0 (compatible; AID/1.0)' },
      });
      clearTimeout(timer);
      if (!r.ok) continue;

      const type = r.headers.get('content-type') || '';
      if (!/^image\//.test(type)) continue;

      const buf = Buffer.from(await r.arrayBuffer());
      if (buf.length < 220) continue;                 // blank / placeholder

      const w = widthOf(buf, type);
      if (!best || w > best.w) best = { buf, type, w, host: url.split('/')[2] };
      if (best.w >= 180) break;                       // good enough, stop early
    } catch (e) { /* try the next source */ }
  }

  if (!best) {
    res.setHeader('cache-control', 'public, s-maxage=3600');
    res.status(404).json({ error: 'no logo for ' + d });
    return;
  }

  res.setHeader('content-type', best.type);
  res.setHeader('cache-control', 'public, s-maxage=604800, stale-while-revalidate=86400');
  res.setHeader('x-logo-source', best.host);
  res.setHeader('x-logo-width', String(best.w));
  res.status(200).send(best.buf);
};
