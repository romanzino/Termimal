define(function (require) {
	var Modules = {
		load: function () {
			return {
				'weather': require('modules/weather'),
				'time': require('modules/time'),
				'help': require('modules/help'),
				'translate': require('modules/translate'),
				'myname': require('modules/myname'),
				'clear': require('modules/clear'),
				'coordinates': require('modules/coordinates'),
				'ip': require('modules/ip')
			}
		}
	};

	return Modules;
})