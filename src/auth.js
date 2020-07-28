const client_id = "a30f76883c26496094f2b7e1f2105539";
const client_secret = "5afba306e6a44182813f8cd266aaf53c";

const state = require ("./state");

var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  };

async function auth() {
    const data = await fetch(authOptions)
    state.token().change(data);
}

function runAuth() {
    auth();
    return 0;
}

module.exports = runAuth();