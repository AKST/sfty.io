BOOTROOT=./assets/vendor/bootstrap-sass-official/assets

init:
	npm install -g bower
	npm install -g grunt-cli
	sudo gem install sass
	grunt build

dependencies: init
	npm install
	bower install

place-assets:
	mkdir -p public/css/bootstrap
	cp -R ${BOOTROOT}/fonts/bootstrap public/css

build: dependencies place-assets
	grunt build

deploy: build
	mkdir -p deploy
	cp -r . deploy/.
	rm deploy/public/test.html

test:
	grunt test

.PHONY: test
