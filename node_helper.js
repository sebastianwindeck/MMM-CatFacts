/* Magic Mirror
 * Node Helper: MMM-CatFacts
 *
 * By Sebastian Windeck
 * MIT Licensed
 */

var NodeHelper = require('node_helper');
var https = require('https')

module.exports = NodeHelper.create({
    start: function () {
        console.log('MMM-CatFacts helper started');
    },

    getCatFact: function (url) {
        var parent = this;

        let options = {
            'method': 'GET',
            'hostname': 'catfact.ninja',
            'path': '/fact?max_length=140',
            'headers': {
                'Accept': 'application/json'
            }
        };

        var req = https.request(options, function (res) {

            var chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function (chunk) {
                var body = Buffer.concat(chunks);
                console.log(body.toString());
                var result = JSON.parse(body);
                console.log(result);
                console.log(result["fact"]);
                parent.sendSocketNotification('CATFACT_RESULT',result);
            });

            res.on("error", function (error) {
                console.log('MMM-CatFacts helper started getCatFact error');
                console.error(error);
            });
        });

        req.end();
    },


    socketNotificationReceived: function(notification, payload) {
        console.log('MMM-CatFacts helper started socketNotificationReceived');
        if (notification === 'GET_CATFACT') {
            this.getCatFact(payload);
        }
    }
});