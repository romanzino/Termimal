define(['views/commands'], function (Commands) {
	var Request = {
		send: function (command, url, data) {
			$.post(
				url,
				data,
				function (data) {
					if (data.response) {
						Commands.add(command, data.response);
					}
					else {
						Commands.add(command, null, 'error');
					}
				},
				'json'
			)
			.fail(function () {
				Commands.add(command, 'Error during request to the server', 'error');
			});
		}
	};

	return Request;
})