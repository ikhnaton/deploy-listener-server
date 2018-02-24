## Deploy Listener Server

This is an attempt to simplify the process of dealing with Github webhooks.  Through use of a simple configuration file, you can configure a listener for a Github webhook from one or multiple repositories.  You can listen for push events.  (I may enhance for any event in the future, it is very easy to do so yourself.)  Upon receipt of the push event, you can execute launch a local executable to do some task.  e.g.  When code gets checked into the master branch, pull updated code from Github and restart the node.js application or start some other process.

### Configuration
To use this application clone this repo or install via npm

```npm install deploy-listener-server```


```
{
	"port": port your webhook listens on,
	"githubPath": "path for your webhook to listen",
	"handlers": [
		{
			"repo": "username/reponame",
			"branch": "refs/heads/branch of interest",
			"executable": "./deploy.sh",
			"slackUsername": "Deploy-Bot",
			"slackChannel": "specific channel for just this handler"
		},
		{
			"repo": "ikhnaton/deploy-listener-server",
			"branch": "refs/heads/master",
			"executable": "./deploy.sh"
        }
	],
	"secret": "Your github secret associated with this webhook",
	"sslKey": "path to your ssl key",
	"sslCert": "path to your ssl certificate",
	"logLevel": "debug",
	"logFile": "../deployer.log",
	"environment": "development",
	"slackMessage": "message to send to slack when successful",
	"slackChannel": "slack channel to post to",
	"slackUrl": "your slack url",
	"slackUsername": "your slack username"
}
```

*logLevel* - The log levels are as follows.

    "fatal" (60): The service/app is going to stop or become unusable now. An operator should definitely look into this soon.
    "error" (50): Fatal for a particular request, but the service/app continues servicing other requests. An operator should look at this soon(ish).
    "warn" (40): A note on something that should probably be looked at by an operator eventually.
    "info" (30): Detail on regular operation.
    "debug" (20): Anything else, i.e. too verbose to be included in "info" level.
    "trace" (10): Logging from external libraries used by your app or very detailed application logging.
