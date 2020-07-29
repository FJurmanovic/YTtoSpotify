const client_id = "a30f76883c26496094f2b7e1f2105539";
const client_secret = "5afba306e6a44182813f8cd266aaf53c";

const state = require ("./state");

var authOptions = {
    method: "POST",
    headers: {
      'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    },
    body: {
      grant_type: 'client_credentials'
    }
  };

const auth = async function () {
    const data = await fetch('https://accounts.spotify.com/api/token', authOptions)
    console.log(data)
    state.token().change(data);
}

module.exports = auth;