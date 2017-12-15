var http = require('http')
function wxPush(channelId, senderTitle, content, title) {
    var options = {
        host:'https://zt-webhook.herokuapp.com/sdk/'+channelId,
        method:"POST",
        headers:{

        }
    }
    return new Promise((resolve, reject) => {
        let req = http.request(options, function(res){
            res.on('data',function(data){
                console.info(data)
                resolve(data)
            })
        })
        req.end()
    })
}