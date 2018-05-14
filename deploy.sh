#!/bin/bash
for site in showcase
do
	./node_modules/@angular/cli/bin/ng build -aot --env=prod --app=$site -prod
	firebase use $site
	firebase deploy
done
exit 0
