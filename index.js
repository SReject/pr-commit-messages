const core = require('@actions/core');
const axios = require('axios');

async function run() {
    let sha = core.getInput('sha', {required: true});

    // get the pr number for the merged commit
    let pr_id = (await axios.get(`https://api.github.com/search/issues?q=${sha}+type:pr+state:closed+is:merged+repo:${repo}`)).data.items[0].number;

    // get the commits for the pr
    let pr_commits = (await axios.get(`https://api.github.com/repos/${repo}/pulls/${pr_id}/commits`)).data;

    // retrieve each commit message, and format it
    let pr_messages = pr_commits.reduce((acc, item) => {

        // remove leading whitespace "*" and "-"
        let message = item.commit.message.replace(/^[\s*-]+/, '')

            // retrieve first line of text
            .split(/[\r\n]/)[0];

        // if the message did not end up being empty:
        //  - Prefix the message with "- "
        //  - Add it to the accumulated messages
        if (message != null && message !== '') {
            acc.push('- ' + message);
        }

        // return the accumulated messages
        return acc;
    }, []);

    core.setOutput('messages', pr_messages.join('\n'));
}

run();