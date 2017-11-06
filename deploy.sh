#!/bin/bash
ng build -aot --env=prod -prod --base-href "https://monpullmoche.com/"
cp src/sitemap.xml dist/sitemap.xml
cp src/robots.txt dist/robots.txt
cp src/CNAME dist/CNAME
npm run precache
firebase login --reauth
firebase deploy
exit 0