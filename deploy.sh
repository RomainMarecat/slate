#!/bin/bash
for site in hockey
do
	./node_modules/@angular/cli/bin/ng build -aot --env=prod --app=$site -prod
	cp src/app-$site/sitemap.xml dist/sitemap.xml
	cp src/app-$site/robots.txt dist/robots.txt
	npm run precache
	firebase use $site
	firebase deploy
done
exit 0
