define(['views/commands', 'request', 'helper', 'text!template/modules/time.html'], function (Commands, Request, Helper, template) {
	var Time = {
		/**
		 * Command description
		 * @type {String}
		 */
		descr: "shows local time. <br>Example: <span class='command-example'>time in Kiev, Ukraine</span>",
		/**
		 * Keyword
		 * @type {String}
		 */
		word: 'time',
		template: _.template(template),
		process: function (command) {
			var locData = Helper.cityCountry(command),
				appContext = this;

			if (locData) {
				Helper.lngLat(locData.city, locData.country)
					.done(function (data) {
						res = data.results[0].geometry.location;
						$.post(
							"backend/modules/time.php",
							{
								latitude: res.lat,
								longitude: res.lng
							},
							function (data) {
								if (data.response) {
									Commands.add(command, appContext.template({
										time: data.response.time,
										sunset: data.response.sunset,
										sunrise: data.response.sunrise,
										timezone: data.response.timezoneId
									}));
								}
								else {
									Commands.add(command, null, 'error');
								}
							},
							'json'
						).fail (function () {
							Commands.add(command, 'server', 'error');
						});
					})
					.fail(function () {
						Commands.add(command, 'server', 'error');
					});
			}
			else {
				Commands.add(command, "Specify the correct city and country. <br>For example: time in Nuuk, Greenland", 'error');
			}
		}
	};

	return Time;
})