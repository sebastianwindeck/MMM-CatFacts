/* Magic Mirror Module: MMM-CatFacts
 * Version: 1.0.0
 *
 * By Sebastian Windeck https://github.com/sebastianwindeck/
 * MIT Licensed.
 */


Module.register('MMM-CatFacts', {

	result: {fact: "Loading cat fact ..."},

	defaults: {
		title: "CatFacts",
		updateInterval: 300 * 1000, // every 300 seconds
		fadeSpeed: 4 * 1000, // four seconds
	},

	start:  function() {
		Log.log('Starting module: ' + this.name);

		// Set up the local values, here we construct the request url to use
		this.getCatFact();
		this.scheduleUpdate();
	},

	getDom: function() {
		var wrapper = document.createElement("div");
		var header  = document.createElement("div");
		header.className = "small dimmed";
		header.style.textAlign = "center";
		header.style.margin = "0 auto";
		header.innerHTML = this.translate("CatFacts");
		wrapper.appendChild(header);

		var catfact = document.createElement("div");
		catfact.className = "bright light medium";
		catfact.style.textAlign = "center";
		catfact.style.margin = "0 auto";
		catfact.innerHTML = this.result["fact"];
		wrapper.appendChild(catfact);
		return wrapper;
	},



	getCatFact: function() {
		// Make the initial request to the helper then set up the timer to perform the update
		Log.log('GetFact');
		this.sendSocketNotification("GET_CATFACT");
	},

	scheduleUpdate: function() {
		setInterval(() => {
			this.getCatFact();
		}, this.config.updateInterval);
	},
	socketNotificationReceived: function(notification, payload) {
		if (notification === "CATFACT_RESULT") {
			this.result = payload;
			this.updateDom(this.config.fadeSpeed);
		}
	},
});