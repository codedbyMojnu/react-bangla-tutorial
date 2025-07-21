const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const { glob } = require('glob');

async function generateSitemap() {
  const stream = new SitemapStream({ hostname: 'https://react-bangla.vercel.app' });
  const files = await glob('pages/**/*.mdx');

  files.forEach(file => {
    const path = file.replace('pages', '').replace('.mdx', '');
    stream.write({ url: path, changefreq: 'daily', priority: 0.7 });
  });

  stream.end();

  const sitemap = await streamToPromise(stream);
  createWriteStream('./public/sitemap.xml').write(sitemap.toString());
}

generateSitemap();
