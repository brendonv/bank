test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--timeout 15000

.PHONY: test