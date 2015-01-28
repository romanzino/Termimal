define(['views/commands', 'request', 'helper', 'text!mtemplate/coordinates.html', 'text!mtemplate/coordinatesAddress.html'], function (Commands, Request, Helper, template, templateAdress) {
	var Coordinates = {
		/**
		 * Command description
		 * @type {String}
		 */
		descr: "shows information about location. <br>Example: location <span class='command-example'>Address, Address</span>. <br>Use <span class='command-example'>--my</span> key to find out your coordinates",
		/**
		 * Keyword
		 * @type {String}
		 */
		word: 'coordinates',
		template: _.template(template),
		templateAdress: _.template(templateAdress),
		process: function (command, keys) {
			var appContext = this,
				adress;

			if (_.contains(keys, '--my')) {
				if (window.navigator) {
					window.navigator.geolocation.getCurrentPosition(function (data) {
						Commands.add(command, appContext.template({
							latitude: data.coords.latitude,
							longitude: data.coords.longitude,
							accuracy: data.coords.accuracy
						}));
					}, function () {
						Commands.add(command, null, 'error')
					});
				}
				else {
					Commands.add(command, "Your browser doesn't support this function", 'error')
				}
			}
			else {
				address = command.replace("coordinates", "").trim();

				if (address.length > 0) {
					$.getJSON("http://maps.google.com/maps/api/geocode/json?address="+address+"&sensor=false")
						.done(function (data) {
							data = data.results[0];
							console.log(data);
							Commands.add(command, appContext.templateAdress({
								address: data.formatted_address,
								longitude: data.geometry.location.lng,
								latitude: data.geometry.location.lat
							}));
						})
						.fail(function (data) {
							Commands.add(command, 'server', 'error')
						})
				}
				else {
					Commands.add(command, 'Specify address', 'error');
				}
			}
		}
	};

	return Coordinates;
})