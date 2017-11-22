#!/bin/bash
ng build -aot --env=prod -prod --base-href="/"
cp src/sitemap.xml dist/sitemap.xml
cp src/robots.txt dist/robots.txt
cp src/CNAME dist/CNAME
npm run precache
exit 0