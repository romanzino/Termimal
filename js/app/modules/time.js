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
				appContext = this,
				res;

			if (locData) {
				Helper.lngLat(locData.city, locData.country)
					.done(function (data) {
						res = data.results[0].geometry.location;
						Request.send.call(
							appContext,
							command,
							{
								latitude: res.lat,
								longitude: res.lng
							},
							function (data) {
								return appContext.template({
									time: data.time,
									sunset: data.sunset,
									sunrise: data.sunrise,
									timezone: data.timezoneId
								});
							}
						);
					})
			}
			else {
				Commands.add(command, "Specify the correct city and country. <br>For example: time in Nuuk, Greenland", 'error');
			}
		}
	};

	return Time;
})