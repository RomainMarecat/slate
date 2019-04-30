#!/bin/bash
for site in store-admin
do
	./node_modules/@angular/cli/bin/ng build --configuration=production --project=$site
	firebase use $site
	firebase deploy --only=hosting:aot
done
exit 0
