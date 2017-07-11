let github = require('../lib/github');

var options = {
	repo: "ikhnaton/deploy-listener-server" ,
	sha: "df60c31302884e9eef1d2d60562aef1dceb78e14",
	token: "",
	state: "success",
	message: "this is a test",
	url: "https://www.google.com",
	context: "Niall"
}

github.setStatus(options);
