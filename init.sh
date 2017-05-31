#!/bin/bash
case $1 in
    all) echo "11111111"
        `node ./bin/www`
	cd public/inquiry/
	`babel --plugins transform-es2015-modules-umd --watch js -d script`
	echo "11111111"
        ;;
    start) echo "222222222"
        `node ./bin/www`
	echo "222222222"
	;;
    compile) echo "33333"
        cd public/inquiry/
	for file in `ls`;do
	    echo $file
	done
	`babel --plugins transform-es2015-modules-umd --watch js -d script`
	echo "33333"
	;;
esac