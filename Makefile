init:
	npm install
	npm install -g bower
	npm install -g grunt-cli

build:
	bower install
	grunt build

ls:
	tree -I 'vendor|node_modules' 
