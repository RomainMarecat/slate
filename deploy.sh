#!/bin/bash
for site in hockey
do
	./node_modules/@angular/cli/bin/ng build -aot --env=prod --app=$site -prod
	cp src/sitemap.xml dist/sitemap.xml
	cp src/robots.txt dist/robots.txt
	npm run precache
done
exit 0
