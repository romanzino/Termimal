define(function () {
	var Helper = {
		lngLat: function (city, country) {
			return $.getJSON("http://maps.google.com/maps/api/geocode/json?address=" + city + "," + country  + "&sensor=false");
		},
		cityCountry: function (command) {
			var comma = command.indexOf(","),
				country = command.substr(comma+1).trim(),
				city,
				indexOfIn = command.indexOf("in");

			city = command.substr(indexOfIn+3, comma - (indexOfIn+3)).trim();
			if (command[comma+1] === " ") {
				city = city.replace(",", "");
			}

			if (/^[a-zA-Z- ]+$/.test(city) && /^[a-zA-Z- ]+$/.test(country)) {
				return {
					city: city,
					country: country
				}
			}
			else {
				return false;
			}
		}
	}

	return Helper;
})