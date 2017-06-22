const GitHub = require('../lib/github');
const bunyan = require('bunyan');
const config = require('../config');

global.log = bunyan.createLogger(
{
	name: "deploy-listener",
	level: config.logLevel,
	streams: [
		{
			type: 'stream',
			stream: process.stdout
        }
	]
});


GitHub.on('push', (event, data) =>
{
		log.info({
			data: {
				event: event,
				repository: data.repository.full_name,
				branch: data.ref
			}
		});
});

let req =
{
	headers: {
		"request url": "https://devpcrhhpd01.w3-969.ibm.com:3002/ghe/webhook",
		"request method": "POST",
		"content-type": "application/json",
		"user-agent": "GitHub-Hookshot/41c084d",
		"x-github-delivery": "1ac3cf00-550f-11e7-98a6-83606acf5a1c",
		"x-github-event": "push",
		"x-hub-signature": "sha1=6ae78387e5aad76cc7b2af4142bdae214930a2c8"
	},
	body:
	{
		"ref": "refs/heads/master",
		"before": "0106e21a99441538524fb4e6f2bd56be6077c7c6",
		"after": "f4fb60c43b3c0a539c09098716d81f24942b983d",
		"created": false,
		"deleted": false,
		"forced": false,
		"base_ref": null,
		"compare": "https://github.ibm.com/CAOApps/HPD2/compare/0106e21a9944...f4fb60c43b3c",
		"commits": [
			{
				"id": "80bcd018e5375dd401edd6cc70c85f7e421ac748",
				"tree_id": "6aa99c3d04d5b6b57ca8ceb6f11a9dda9ccd3fc7",
				"distinct": false,
				"message": "pipeline chart and gauge chart",
				"timestamp": "2017-06-19T09:43:37-07:00",
				"url": "https://github.ibm.com/CAOApps/HPD2/commit/80bcd018e5375dd401edd6cc70c85f7e421ac748",
				"author":
				{
					"name": "akuloghl",
					"email": "akuloghl@us.ibm.com",
					"username": "akuloghl"
				},
				"committer":
				{
					"name": "akuloghl",
					"email": "akuloghl@us.ibm.com",
					"username": "akuloghl"
				},
				"added": [
        "client/app/components/common/gauge-chart/gauge-chart.js",
        "client/app/components/common/gauge-chart/guage-chart.css"
      ],
				"removed": [

      ],
				"modified": [
        "client/app/components/common/pipeline-table/pipeline-table.css",
        "client/app/components/common/pipeline-table/pipeline-table.js",
        "client/app/components/dashboard/finperf/finperf.js",
        "client/app/css/main.css",
        "client/app/index.html"
      ]
    },
			{
				"id": "f4fb60c43b3c0a539c09098716d81f24942b983d",
				"tree_id": "c23b6d938888ee6ff653436a0ed1ac505646d347",
				"distinct": true,
				"message": "Merge pull request #96 from CAOApps/akulo-pipeline\n\npipeline chart and gauge chart",
				"timestamp": "2017-06-19T09:48:21-07:00",
				"url": "https://github.ibm.com/CAOApps/HPD2/commit/f4fb60c43b3c0a539c09098716d81f24942b983d",
				"author":
				{
					"name": "Arik E. Kulogyan",
					"email": "akuloghl@us.ibm.com",
					"username": "akuloghl"
				},
				"committer":
				{
					"name": "GitHub Enterprise",
					"email": "noreply@github.ibm.com"
				},
				"added": [
        "client/app/components/common/gauge-chart/gauge-chart.js",
        "client/app/components/common/gauge-chart/guage-chart.css"
      ],
				"removed": [

      ],
				"modified": [
        "client/app/components/common/pipeline-table/pipeline-table.css",
        "client/app/components/common/pipeline-table/pipeline-table.js",
        "client/app/components/dashboard/finperf/finperf.js",
        "client/app/css/main.css",
        "client/app/index.html"
      ]
    }
  ],
		"head_commit":
		{
			"id": "f4fb60c43b3c0a539c09098716d81f24942b983d",
			"tree_id": "c23b6d938888ee6ff653436a0ed1ac505646d347",
			"distinct": true,
			"message": "Merge pull request #96 from CAOApps/akulo-pipeline\n\npipeline chart and gauge chart",
			"timestamp": "2017-06-19T09:48:21-07:00",
			"url": "https://github.ibm.com/CAOApps/HPD2/commit/f4fb60c43b3c0a539c09098716d81f24942b983d",
			"author":
			{
				"name": "Arik E. Kulogyan",
				"email": "akuloghl@us.ibm.com",
				"username": "akuloghl"
			},
			"committer":
			{
				"name": "GitHub Enterprise",
				"email": "noreply@github.ibm.com"
			},
			"added": [
      "client/app/components/common/gauge-chart/gauge-chart.js",
      "client/app/components/common/gauge-chart/guage-chart.css"
    ],
			"removed": [

    ],
			"modified": [
      "client/app/components/common/pipeline-table/pipeline-table.css",
      "client/app/components/common/pipeline-table/pipeline-table.js",
      "client/app/components/dashboard/finperf/finperf.js",
      "client/app/css/main.css",
      "client/app/index.html"
    ]
		},
		"repository":
		{
			"id": 161701,
			"name": "HPD2",
			"full_name": "CAOApps/HPD2",
			"owner":
			{
				"name": "CAOApps",
				"email": null
			},
			"private": true,
			"html_url": "https://github.ibm.com/CAOApps/HPD2",
			"description": "High Performance Dashboard application version 2",
			"fork": false,
			"url": "https://github.ibm.com/CAOApps/HPD2",
			"forks_url": "https://github.ibm.com/api/v3/repos/CAOApps/HPD2/forks",
			"keys_url": "https://github.ibm.com/api/v3/repos/CAOApps/HPD2/keys{/key_id}",
			"collaborators_url": "https://github.ibm.com/api/v3/repos/CAOApps/HPD2/collaborators{/collaborator}",
			"teams_url": "https://github.ibm.com/api/v3/repos/CAOApps/HPD2/teams",
			"hooks_url": "https://github.ibm.com/api/v3/repos/CAOApps/HPD2/hooks",
			"issue_events_url": "https://github.ibm.com/api/v3/repos/CAOApps/HPD2/issues/events{/number}",
			"events_url": "https://github.ibm.com/api/v3/repos/CAOApps/HPD2/events",
			"assignees_url": "https://github.ibm.com/api/v3/repos/CAOApps/HPD2/assignees{/user}",
			"branches_url": "https://github.ibm.com/api/v3/repos/CAOApps/HPD2/branches{/branch}",
			"tags_url": "https://github.ibm.com/api/v3/repos/CAOApps/HPD2/tags",
			"blobs_url": "https://github.ibm.com/api/v3/repos/CAOApps/HPD2/git/blobs{/sha}",
			"git_tags_url": "https://github.ibm.com/api/v3/repos/CAOApps/HPD2/git/tags{/sha}",
			"git_refs_url": "https://github.ibm.com/api/v3/repos/CAOApps/HPD2/git/refs{/sha}",
			"trees_url": "https://github.ibm.com/api/v3/repos/CAOApps/HPD2/git/trees{/sha}",
			"statuses_url": "https://github.ibm.com/api/v3/repos/CAOApps/HPD2/statuses/{sha}",
			"languages_url": "https://github.ibm.com/api/v3/repos/CAOApps/HPD2/languages",
			"stargazers_url": "https://github.ibm.com/api/v3/repos/CAOApps/HPD2/stargazers",
			"contributors_url": "https://github.ibm.com/api/v3/repos/CAOApps/HPD2/contributors",
			"subscribers_url": "https://github.ibm.com/api/v3/repos/CAOApps/HPD2/subscribers",
			"subscription_url": "https://github.ibm.com/api/v3/repos/CAOApps/HPD2/subscription",
			"commits_url": "https://github.ibm.com/api/v3/repos/CAOApps/HPD2/commits{/sha}",
			"git_commits_url": "https://github.ibm.com/api/v3/repos/CAOApps/HPD2/git/commits{/sha}",
			"comments_url": "https://github.ibm.com/api/v3/repos/CAOApps/HPD2/comments{/number}",
			"issue_comment_url": "https://github.ibm.com/api/v3/repos/CAOApps/HPD2/issues/comments{/number}",
			"contents_url": "https://github.ibm.com/api/v3/repos/CAOApps/HPD2/contents/{+path}",
			"compare_url": "https://github.ibm.com/api/v3/repos/CAOApps/HPD2/compare/{base}...{head}",
			"merges_url": "https://github.ibm.com/api/v3/repos/CAOApps/HPD2/merges",
			"archive_url": "https://github.ibm.com/api/v3/repos/CAOApps/HPD2/{archive_format}{/ref}",
			"downloads_url": "https://github.ibm.com/api/v3/repos/CAOApps/HPD2/downloads",
			"issues_url": "https://github.ibm.com/api/v3/repos/CAOApps/HPD2/issues{/number}",
			"pulls_url": "https://github.ibm.com/api/v3/repos/CAOApps/HPD2/pulls{/number}",
			"milestones_url": "https://github.ibm.com/api/v3/repos/CAOApps/HPD2/milestones{/number}",
			"notifications_url": "https://github.ibm.com/api/v3/repos/CAOApps/HPD2/notifications{?since,all,participating}",
			"labels_url": "https://github.ibm.com/api/v3/repos/CAOApps/HPD2/labels{/name}",
			"releases_url": "https://github.ibm.com/api/v3/repos/CAOApps/HPD2/releases{/id}",
			"deployments_url": "https://github.ibm.com/api/v3/repos/CAOApps/HPD2/deployments",
			"created_at": 1494523412,
			"updated_at": "2017-05-17T20:34:30Z",
			"pushed_at": 1497890902,
			"git_url": "git://github.ibm.com/CAOApps/HPD2.git",
			"ssh_url": "git@github.ibm.com:CAOApps/HPD2.git",
			"clone_url": "https://github.ibm.com/CAOApps/HPD2.git",
			"svn_url": "https://github.ibm.com/CAOApps/HPD2",
			"homepage": null,
			"size": 2037,
			"stargazers_count": 0,
			"watchers_count": 0,
			"language": "JavaScript",
			"has_issues": true,
			"has_downloads": true,
			"has_wiki": true,
			"has_pages": false,
			"forks_count": 1,
			"mirror_url": null,
			"open_issues_count": 1,
			"forks": 1,
			"open_issues": 1,
			"watchers": 0,
			"default_branch": "master",
			"stargazers": 0,
			"master_branch": "master",
			"organization": "CAOApps"
		},
		"pusher":
		{
			"name": "akuloghl",
			"email": "akuloghl@us.ibm.com"
		},
		"organization":
		{
			"login": "CAOApps",
			"id": 32264,
			"url": "https://github.ibm.com/api/v3/orgs/CAOApps",
			"repos_url": "https://github.ibm.com/api/v3/orgs/CAOApps/repos",
			"events_url": "https://github.ibm.com/api/v3/orgs/CAOApps/events",
			"hooks_url": "https://github.ibm.com/api/v3/orgs/CAOApps/hooks",
			"issues_url": "https://github.ibm.com/api/v3/orgs/CAOApps/issues",
			"members_url": "https://github.ibm.com/api/v3/orgs/CAOApps/members{/member}",
			"public_members_url": "https://github.ibm.com/api/v3/orgs/CAOApps/public_members{/member}",
			"avatar_url": "https://avatars.github.ibm.com/u/32264?",
			"description": null
		},
		"sender":
		{
			"login": "akuloghl",
			"id": 15029,
			"avatar_url": "https://avatars.github.ibm.com/u/15029?",
			"gravatar_id": "",
			"url": "https://github.ibm.com/api/v3/users/akuloghl",
			"html_url": "https://github.ibm.com/akuloghl",
			"followers_url": "https://github.ibm.com/api/v3/users/akuloghl/followers",
			"following_url": "https://github.ibm.com/api/v3/users/akuloghl/following{/other_user}",
			"gists_url": "https://github.ibm.com/api/v3/users/akuloghl/gists{/gist_id}",
			"starred_url": "https://github.ibm.com/api/v3/users/akuloghl/starred{/owner}{/repo}",
			"subscriptions_url": "https://github.ibm.com/api/v3/users/akuloghl/subscriptions",
			"organizations_url": "https://github.ibm.com/api/v3/users/akuloghl/orgs",
			"repos_url": "https://github.ibm.com/api/v3/users/akuloghl/repos",
			"events_url": "https://github.ibm.com/api/v3/users/akuloghl/events{/privacy}",
			"received_events_url": "https://github.ibm.com/api/v3/users/akuloghl/received_events",
			"type": "User",
			"site_admin": false
		}
	}
};

let res = {
	sendStatus: function(value)
	{

	}
};

GitHub.notify(req, res, function() {});
