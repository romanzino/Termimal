define(['views/commands', 'request', 'helper', 'text!template/modules/ip.html'], function (Commands, Request, Helper, template) {
	var Time = {
		/**
		 * Command description
		 * @type {String}
		 */
		descr: "shows information about ip. <br> Use <span class='command-example'>--my</span> key to find out your ip.",
		/**
		 * Keyword
		 * @type {String}
		 */
		word: 'ip',
		template: _.template(template),
		process: function (command, keys) {
			var appContext = this,
				ip,
				template;

			if (_.contains(keys, "--my")) {
				ip = "my";
				title = "Your ip is";
			}
			else {
				ip = command.replace("ip ", "");
				title = "Information about"
			}


			Request.send.call(
				this,
				command,
				{
					ip: ip
				},
				function (data) {
					return appContext.template({
						title: title,
						ip: data.query,
						city: data.city,
						country: data.country,
						region: data.regionName,
					});
				}
			);
		}
	};

	return Time;
})