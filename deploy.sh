#!/bin/bash
for site in alr
do
	./node_modules/@angular/cli/bin/ng build --aot --project=$site --prod
	firebase use $site
	firebase deploy
done
exit 0
