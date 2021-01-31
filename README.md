# ipfs-papers-scrape

chrome-extension://nmdkebiopcgmbkhkcpeiedopnalmkbnf

Run `npx webpack` to compile the src javascript to dist. It watches for changes automatically. The extension must be reloaded in the extension manager for the changes to work.

Don't forget to make sure ipfs node is running and CORS is allowed as follows:

ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["chrome-extension://nmdkebiopcgmbkhkcpeiedopnalmkbnf"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "POST", "GET"]'

The IPFS companion extension is needed in order to view PDFs
