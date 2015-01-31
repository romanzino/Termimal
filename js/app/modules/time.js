define(['views/commands', 'request', 'helper', 'text!template/modules/time.html'], function (Commands, Request, Helper, template) {
	var Time = {
		/**
		 * Command description
		 * @type {String}
		 */
		descr: "shows local time. <div>Syntax: <span class='command-example'>time =address=</span></div><div>Example: <span class='command-example'>time San-Diego, USA</span></div>",
		/**
		 * Keyword
		 * @type {String}
		 */
		word: 'time',
		template: _.template(template),
		process: function (command) {
			var locData = command.replace(this.word, "").trim(),
				appContext = this,
				res;

			if (locData) {
				Helper.lngLat(locData)
					.done(function (data) {
						res = data.results[0];
						Request.send.call(
							appContext,
							command,
							{
								latitude: res.geometry.location.lat,
								longitude: res.geometry.location.lng
							},
							function (data) {
								return appContext.template({
									time: data.time,
									sunset: data.sunset,
									sunrise: data.sunrise,
									timezone: data.timezoneId,
									address: res.formatted_address
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