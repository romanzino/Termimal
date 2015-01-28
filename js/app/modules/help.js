define(['views/commands'], function (Commands) {
	var Help = {
		/**
		 * Command description
		 * @type {String}
		 */
		descr: 'shows available commands',
		/**
		 * Keyword
		 * @type {String}
		 */
		word: 'help',
		/**
		 * Check command and if everything is ok send request to server
		 * @param {string} command The command that was received from user
		 */
		process: function (command, keys, modules) {
			var key, 
				response = "<p>Avaible commands:</p>",
				moduleName,
				res;

			if (command === 'help') {
				for (key in modules) {
					response += "<div class='help-item'>"+ modules[key].word + "</div>";
				}
				response += "<div class='descr'>Use <span class='command-example'>help modulename</span> to find out functionality of particular command</div>";
				Commands.add(command, response);
			}
			else {
				moduleName = command.replace("help", "").trim();
				
				res = _.findWhere(modules, {
					word: moduleName
				});

				if (res) {
					Commands.add(command, res.descr);
				}
				else {
					Commands.add(command, "Command not exist", 'error');
				}
			}
		}
	};

	return Help;
})