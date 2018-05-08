const Trello = require("node-trello")

module.exports.handler = (event, context, callback) => {
    const githubEvent = event.headers["X-GitHub-Event"]

    if (githubEvent === "push") {
        var payload = JSON.parse(event.body)
        payload.commits.forEach((commit) => {
            var username = commit.author.username.toLowerCase()
            var trello_key = process.env[username + "_trello_key"]
            var trello_token = process.env[username + "_trello_token"]
            if (trello_key && trello_token) {
                var trello = new Trello(trello_key, trello_token)
                var matcher = commit.message.match(/trello#([\w\d]*)/)
                if (matcher && matcher.length == 2) {
                    var cardId = matcher[1]
                    var msg = commit.message.replace(matcher[0], "[Github](" + commit.url + ")")
                    trello.post("/1/cards/" + cardId + "/actions/comments", {text: msg}, (err, data) => {
                        console.log(data) 
                    })
                }
            }
        })
    }

    return callback(null, {
        statusCode: 200,
        headers: {'Content-Type': 'application/json'},
        body: event.body
    }) 
}

