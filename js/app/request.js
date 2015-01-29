define(['views/commands'], function (Commands) {
	var Request = {
		send: function (command, data, success) {
			var xhr,
				time = 0,
				requestInterval;

			xhr = $.ajax({
				url: "backend/modules/" + this.word + ".php",
				type: "POST",
				data: data,
				dataType: 'json',
				beforeSend: function () {
					requestInterval = setInterval(function () {
						time += 500;

						if (time > 5000) {
							xhr.abort();
							clearInterval(requestInterval);
						}
					}, 500);
				}
			})
			.success(function (data) {
				if (data.response) {
					Commands.add(command, success ? success(data.response) : data.response);
				}
				else {
					Commands.add(command, data.errorText ? data.errorText : null, 'error');
				}
			})
			.fail(function () {
				Commands.add(command, 'Error during request to the server', 'error');
			});

			return xhr;
		}
	};

	return Request;
})