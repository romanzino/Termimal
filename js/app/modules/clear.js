define(['views/commands', 'views/commandInput'], function (Commands, CommandInput) {
	var Clear = {
		/**
		 * Command description
		 * @type {String}
		 */
		descr: 'clear window',
		/**
		 * Keyword
		 * @type {String}
		 */
		word: 'clear',
		process: function () {
			Commands.clear();
			CommandInput
				.clear()
				.enable();
		}
	};

	return Clear;
})