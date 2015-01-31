define(['views/commands', 'request', 'helper', 'text!template/modules/weather.html'], function (Commands, Request, Helper, template) {
	var Weather = {
		descr: "shows weather. <div>Syntax: <span class='command-example'>weather =address=</span></div><div>Example: <span class='command-example'>weather San-Diego, USA</span></div>",
		word: 'weather',
		template: _.template(template),
		process: function (command) {
			var locData = command.replace(this.word, "").trim(),
				appContext = this;

			if (locData) {
				Helper.lngLat(locData)
					.done(function (data) {
						res = data.results[0];
						
						if (res.geometry.location.lat && res.geometry.location.lng) {
							$.getJSON("http://api.openweathermap.org/data/2.5/weather?lat="+ res.geometry.location.lat +"&lon="+res.geometry.location.lng)
								.done(function (data) {
									Commands.add(command, appContext.template({
										icon: data.weather[0].icon,
										description: data.weather[0].description[0].toUpperCase() + data.weather[0].description.slice(1),
										temperature: Math.round(data.main.temp - 273.15),
										wind: data.wind.speed,
										humidity: data.main.humidity,
										pressure: data.main.pressure,
										address: res.formatted_address
									}));
								})
								.fail(function () {
									Commands.add(command, null, 'error');
								});
						}
						else {
							Commands.add(command, null, 'error');
						}
					})
					.fail(function () {
						Commands.add(command, null, 'error');
					});
			}
			else {
				Commands.add(command, "Specify the correct city and country. <br>For example: weather in Nuuk, Greenland", 'error');
			}
		}
	};

	return Weather;
})