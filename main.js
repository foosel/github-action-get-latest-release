const core = require('@actions/core');
const { Octokit } = require("@octokit/rest");

const repository = core.getInput('repository');
var owner = core.getInput('owner');
var repo = core.getInput('repo');
var prerelease = core.getInput('prerelease');

const octokit = new Octokit()

async function run() {
    try {
        if (repository){
            [owner, repo] = repository.split("/");
        }

        if (prerelease) {
            const releases  = await octokit.repos.listReleases({
                owner: owner,
                repo: repo,
            });
            core.setOutput('release', releases.data[0].tag_name)
        } else {
            const release = await octokit.repos.getLatestRelease({
                owner: owner,
                repo: repo,
            });
            core.setOutput('release', release.data.tag_name);
        }
    } catch (error) {
        core.setFailed(error.message);
    }
}

run()
