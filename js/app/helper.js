define(['views/commands'], function (Commands) {
	var Helper = {
		lngLat: function (address) {
			json = $.getJSON("http://maps.google.com/maps/api/geocode/json?address=" + address + "&sensor=false")
				.fail(function () {
					Commands.add(command, 'server', 'error');
				});

			return json;
		}
	}

	return Helper;
})