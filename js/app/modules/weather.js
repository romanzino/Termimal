define(['views/commands', 'request', 'helper', 'text!template/modules/weather.html'], function (Commands, Request, Helper, template) {
	var Weather = {
		descr: "shows weather. <br>Example: <span class='command-example'>weather in Miami, USA</span>",
		word: 'weather',
		template: _.template(template),
		process: function (command) {
			var locData = Helper.cityCountry(command),
				appContext = this;

			if (locData) {
				Helper.lngLat(locData.city, locData.country)
					.done(function (data) {
						res = data.results[0].geometry.location;
						
						if (res.lat && res.lng) {
							$.getJSON("http://api.openweathermap.org/data/2.5/weather?lat="+ res.lat +"&lon="+res.lng)
								.done(function (data) {
									Commands.add(command, appContext.template({
										icon: data.weather[0].icon,
										description: data.weather[0].description[0].toUpperCase() + data.weather[0].description.slice(1),
										temperature: Math.round(data.main.temp - 273.15),
										wind: data.wind.speed,
										humidity: data.main.humidity,
										pressure: data.main.pressure
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