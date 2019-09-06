/* Magic Mirror
 * Node Helper: MMM-CatFacts
 *
 * By Sebastian Windeck
 * MIT Licensed
 */

var NodeHelper = require('node_helper');
var request = require('request');
var https = require('https')

module.exports = NodeHelper.create({
    start: function () {
        console.log('MMM-CatFacts helper started');
    },

    getCatFact: function (url) {
        var parent = this; // save this object
        let options = {
            'method': 'GET',
            'hostname': 'catfact.ninja',
            'path': '/fact?max_length=140',
            'headers': {
                'Accept': 'application/json'
            }
        };

        var req = https.request(options, function (res) {


            res.on("data", function (error, response, body) {

                if (!error && res.statusCode === 200) {
                    var result = JSON.parse(res.body);
                    parent.sendSocketNotification('CATFACT_RESULT', result);
                }
            });

            res.on("end", function (parent) {
                var body = Buffer.concat(parent);
                console.log(body.toString());
            });

            res.on("error", function (error) {
                console.error(error);
            });
        });

        req.end();
    },


    socketNotificationReceived: function(notification, payload) {
        if (notification == 'GET_CATFACT') {
            this.getCatFact(payload);
        }
    }
});