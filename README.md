# ipfs-papers-scrape

chrome-extension://nmdkebiopcgmbkhkcpeiedopnalmkbnf

Run `npx webpack` to compile the src javascript to dist. It watches for changes automatically

Don't forget to make sure ipfs node is running and CORS is allowed as follows:

ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["chrome-extension://nmdkebiopcgmbkhkcpeiedopnalmkbnf"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "POST", "GET"]'

Run `node corsProxy.js` to start The CORS anywhere server. PDFs cannot be fetched without this server running.
