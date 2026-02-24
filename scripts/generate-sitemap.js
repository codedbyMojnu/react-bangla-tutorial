const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const { glob } = require('glob');

async function generateSitemap() {
  const stream = new SitemapStream({ hostname: 'https://react-bangla.vercel.app' });
  const files = await glob('pages/**/*.mdx');

  files.forEach(file => {
    let path = file.replace('pages', '').replace('.mdx', '').replace(/\\/g, '/');
    if (path.endsWith('/index')) {
      path = path.replace('/index', '/');
    } else if (path === '/index') {
      path = '/';
    }
    stream.write({ url: path, changefreq: 'daily', priority: 0.7 });
  });

  stream.end();

  const sitemap = await streamToPromise(stream);
  createWriteStream('./public/sitemap.xml').write(sitemap.toString());
}

generateSitemap();
