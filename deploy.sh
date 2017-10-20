#!/bin/bash
ng build -aot --env=prod -prod --base-href "http://monpullmoche/"
cp dist/index.html dist/404.html
cp src/sitemap.xml dist/sitemap.xml
cp src/robots.txt dist/robots.txt
cp src/CNAME dist/CNAME
ngh
exit 0