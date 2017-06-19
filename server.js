const http = require('http');
const https = require('https');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/travis/notifications", travis);

let port = 8000;

//if (process.env.PORT)
//{
	http.createServer(app).listen(port, () => {
		console.log("Server started on http://localhost:" + port);
	});
//}
//else
//{
//	https.createServer({
//		 key: fs.readFileSync(config.sslCertKey),
//		 cert: fs.readFileSync(config.sslCert)
//	 }, app).listen(port, () => {
//		console.log("Server started on https://localhost:" + port);
//	});
//}

function travis(req, res)
{
	console.log(req.body);
	req.send("OK");
}
