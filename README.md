# ipfs-papers-scrape

Run `./node_modules/.bin/babel src --out-dir lib` to compile some of the javascript to lib (more details [here](https://babeljs.io/docs/en/usage))

Run `npx webpack` to compile the src javascript to dist. It watches for changes automatically

Don't forget to make sure ipfs node is running and CORS is allowed as follows:

ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["chrome-extension://nmdkebiopcgmbkhkcpeiedopnalmkbnf"]'
$ ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "POST", "GET"]'
