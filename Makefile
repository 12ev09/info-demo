# server start
.PHONY: start
open: start
	npm start

# json-server start
.PHONY: db
open: db
	npm run json-server
