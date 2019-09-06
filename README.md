# Module: MMM-CatFacts
Just a little simple plugin for [MagicMirror](https://github.com/MichMich/MagicMirror/) to access the API of  [CatFacts](https://catfact.ninja/) as a stream for your mirror. 



**Screenshot**

![](screenshot.JPG)


## Installation

In your terminal, go to your MagicMirror's Module folder:
````
cd ~/MagicMirror/modules
````

Clone this repository:
````
git clone https://github.com/sebastianwindeck/MMM-CatFacts.git
````

Configure the module in your `config.js` file.

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:
````javascript
modules: 
[
	{
		module: 'MMM-CatFacts',
		position: 'fullscreen_above',
		config: { // See 'Configuration options' for more information.
			title: "CatFacts",
			updateInterval: 300 * 1000, // every 300 seconds
			fadeSpeed: 4 * 1000, // four seconds
			},
	}
]
````

## Configuration options

The following property can be configured:


|Option|Description|
|---|---|
|`updateInterval`|Defines the time of one fact in milliseconds. <br>**Default value:** `300 * 1000`|
|`fadeSpeed`| Defines the speed of fading from one fact to another.<br>**Default value:** `4 * 1000`|
