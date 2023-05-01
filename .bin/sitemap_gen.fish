#!/usr/bin/env fish

if not test -f package.json
  echo "Run this script from the root of the project"
  exit 1
end

function get_post_mtime
  node --input-type module -e "import metadata from './data/metadata.mjs';
  console.log(metadata.posts.find(post => post.slug === '"$argv[1]"').date)"
end

function get_all_posts
  node --input-type module -e "import metadata from './data/metadata.mjs';
  console.log(metadata.posts.map(post => post.slug).join('\n'))"
end

set -l xml '
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'

# root_page
set xml $xml'
  <url>
    <loc>https://www.mildlyboring.com/</loc>
    <lastmod>'(date -Iseconds -r app/page.tsx)'</lastmod>
    <changefreq>always</changefreq>
  </url>'

for page in data/pages/*.md
  set -l slug (basename $page .md)
  set xml $xml'
  <url>
    <loc>https://www.mildlyboring.com/'$slug'</loc>
    <lastmod>'(date -Iseconds -r $page)'</lastmod>
    <changefreq>weekly</changefreq>
  </url>'
end

for post in (get_all_posts)
  set -l mtime (get_post_mtime $post)
  set xml $xml'
  <url>
    <loc>https://www.mildlyboring.com/posts/'$post'</loc>
    <lastmod>'$mtime'</lastmod>
    <changefreq>daily</changefreq>
  </url>'
end

set xml $xml'
</urlset>'

echo $xml | tee app/sitemap.xml
