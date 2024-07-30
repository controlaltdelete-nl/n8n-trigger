const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    try {
        const webhookUrl = core.getInput('webhook-url');

        const payload = {
            repository: github.context.repo,
            ref: github.context.ref,
            commit: github.context.sha,
            branch: github.context.ref.replace('refs/heads/', ''),
            author: github.context.actor,
            github_context: github.context
        };

        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        console.log(`Webhook sent with status: ${response.status}`);
    } catch (error) {
        core.setFailed(`Action failed with error: ${error.message}`);
    }
}

run();
