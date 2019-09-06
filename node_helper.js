/* Magic Mirror
 * Node Helper: MMM-CatFacts
 *
 * By Sebastian Windeck
 * MIT Licensed
 */

var NodeHelper = require('node_helper');
var request = require('request');

module.exports = NodeHelper.create({
    start: function () {
        console.log('MMM-CatFacts helper started');
    },

    getCatFact: function (url) {
        var parent = this; // save this object
        request({ url: 'https://catfact.ninja/fact',
            headers:{
                'Accept':'application/json',
                'User-Agent': 'MMM-CatFacts (https://github.com/sebastianwindeck/MMM-CatFacts)'
            },
            method: 'GET' }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var result = JSON.parse(response.body);
                parent.sendSocketNotification('CATFACT_RESULT', result);
            }
        });
    },

    socketNotificationReceived: function(notification, payload) {
        if (notification === 'GET_CATFACT') {
            this.getCatFact(payload);
        }
    }
});