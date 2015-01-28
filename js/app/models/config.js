define(function () {
	var Config = Backbone.Model.extend({
    	defaults: {
    		username: 'unknown',
            errorDefault: 'Please, check your command and try again',
            errorServer: 'Error during request the server. Please check your command and your internet connection.'
    	},
    	validate: function (attr) {
    		if (attr.username) {
    			if (/^[a-zA-Z0-9-]+$/.test(attr.username)) {
    				if (attr.username.length > 19) {
    					return 'Your username is too long';
    				}
    			}
    			else {
    				return 'Please check your username and try again.';
    			}
    		}
    	}
	});

	return new Config;
})