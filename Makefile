BOOTROOT=./assets/vendor/bootstrap-sass-official/assets

init:
	npm install -g bower
	npm install -g grunt-cli
	sudo gem install sass
	sudo gem install compass
	grunt build

dependencies: init
	npm install
	bower install

place-assets:
	mkdir -p public/fonts
	cp ${BOOTROOT}/fonts/bootstrap/* public/fonts/.

build: dependencies place-assets
	grunt build

deploy: build
	mkdir -p deploy
	cp -r . deploy/.
	rm deploy/public/test.html

ls:
	tree -I 'public|vendor|node_modules' 

test:
	grunt test

.PHONY: test
