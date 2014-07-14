BOOTROOT=./assets/vendor/bootstrap-sass-official/assets

init:
	npm install -g bower
	npm install -g grunt-cli

dependencies: init
	npm install
	bower install

place-assets:
	mkdir -p public/fonts
	cp ${BOOTROOT}/fonts/bootstrap/* public/fonts/.

build: dependencies place-assets
	grunt build

ls:
	tree -I 'vendor|node_modules' 
