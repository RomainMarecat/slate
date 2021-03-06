#!/bin/bash
for site in store
do
	npm run build-universal
	cp -a functions/dist/browser/. public
	mv public/index.html public/index2.html
	firebase use $site
	firebase deploy --only=functions:ssr
	firebase deploy --only=hosting:ssr
done
exit 0
