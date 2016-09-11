module.exports = {
  build: {
    "index.html": "index.html",
    "app.js": [
//	"javascripts/web3.min.js",
	"javascripts/jquery.min.js",
	"javascripts/qrcode.min.js",
	"javascripts/app.js"
    ],
    "app.css": [
      "stylesheets/app.css"
    ],
    "images/": "images/"
  },
  rpc: {
    host: "localhost",
    port: 8545
  }
};
