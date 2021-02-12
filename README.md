# ipfs-papers-scrape

chrome-extension://nmdkebiopcgmbkhkcpeiedopnalmkbnf

Run `npx webpack` to compile the src javascript to dist. It watches for changes automatically. The extension must be reloaded in the extension manager for the changes to work.

Don't forget to make sure ipfs node is running and CORS is allowed as follows:

ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["*"]'
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '["PUT", "POST", "GET"]'

Allowing "\*" to access ipfs is dangerous. It should be updated to only allow:
chrome-extension://<id_of_scrape_extension>
chrome-extension://<id_of_ipfs_companion>
client app url

The configuration directory for the Brave managed go-ipfs node can be found in the browser’s profile directory in a subfolder named brave_ipfs. You can find your profile directory listed here: brave://version/. After the Brave ipfs config file has been changed, run `pkill ipfs` then go to brave://ipfs and hit 'stop' then 'start'. The IPFS companion will not be able to connect unless access control is explicitly granted to it as indicated above.

The IPFS companion extension is needed in order to view PDFs

The manifest.json can be found in dist
