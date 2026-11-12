// One-off asset prep: trims logo padding, builds favicons + OG image from the real logo.
import sharp from 'sharp';
const src = 'src/assets/img';
const gold = await sharp(`${src}/logo-ira-2.png`).trim().toBuffer({ resolveWithObject: true });
console.log('gold trimmed', gold.info.width, gold.info.height);
await sharp(gold.data).toFile('src/assets/logo-gold.png');
const grey = await sharp(`${src}/logo-ira-1.png`).trim().toBuffer();
await sharp(grey).toFile('src/assets/logo-grey.png');
// sample dominant opaque colour of gold logo
const { data, info } = await sharp(gold.data).raw().toBuffer({ resolveWithObject: true });
let r=0,g=0,b=0,n=0;
for (let i=0;i<data.length;i+=info.channels){ if (data[i+3]>250){ r+=data[i];g+=data[i+1];b+=data[i+2];n++; } }
const hex = '#'+[r,g,b].map(v=>Math.round(v/n).toString(16).padStart(2,'0')).join('');
console.log('gold hex', hex);
// Mark only (top part, without the HOSPITALITY line) for the favicon
const meta = await sharp(gold.data).metadata();
const markH = Math.round(meta.height * 0.72);
const mark = await sharp(gold.data).extract({ left: 0, top: 0, width: meta.width, height: markH }).trim().toBuffer();
const icon = async (size, out, pad = 0.18) => {
  const inner = Math.round(size * (1 - pad * 2));
  const m = await sharp(mark).resize(inner, inner, { fit: 'contain', background: { r:0,g:0,b:0,alpha:0 } }).toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: '#000000' } })
    .composite([{ input: m, gravity: 'center' }]).png().toFile(out);
};
await icon(32, 'public/favicon-32x32.png', 0.1);
await icon(180, 'public/apple-touch-icon.png');
await icon(192, 'public/android-chrome-192x192.png');
await icon(512, 'public/android-chrome-512x512.png');
// OG image 1200x630
const logoForOg = await sharp(gold.data).resize({ height: 140 }).toBuffer();
const svg = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
<rect width="1200" height="630" fill="#000"/>
<line x1="300" y1="0" x2="300" y2="630" stroke="#1e2939"/><line x1="600" y1="0" x2="600" y2="630" stroke="#1e2939"/><line x1="900" y1="0" x2="900" y2="630" stroke="#1e2939"/>
<text xml:space="preserve" x="600" y="470" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="34" fill="#ffffff"><tspan font-weight="700">Designed</tspan><tspan font-weight="300"> for the Guest, </tspan><tspan font-weight="700">Built</tspan><tspan font-weight="300"> for the Brand.</tspan></text>
<rect x="560" y="510" width="80" height="4" rx="2" fill="#ff6900"/></svg>`);
await sharp(svg).composite([{ input: logoForOg, top: 190, left: Math.round(600 - (await sharp(logoForOg).metadata()).width / 2) }]).jpeg({ quality: 88 }).toFile('public/og-image.jpg');
console.log('done');
