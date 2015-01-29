define(['request', 'views/commands'], function (Request, Commands) {
	var Translate = {
		/**
		 * Command description
		 * @type {String}
		 */
		descr: "translate text. <br>Example: <span class='command-example'>translate phrase --from --to</span><br><span class='command-example'>translate hello --en --es</span><br>List of available language - <a href='http://goo.gl/4f8vsQ' target='_blank'>is here</a>",
		/**
		 * Keyword
		 * @type {String}
		 */
		word: 'translate',
		/**
		 * Check command and if everything is ok send request to server
		 * @param  {string} command The command that was received from user
		 */
		process: function (command, keys) {
			var text = command.replace("translate", "").trim();

			if (keys) {
				//Detect language
				if (text.length > 0) {
					Request.send.call(
						this,
						command, 
						{
							text: text,
							keys: keys
						}
					);
				}
			}
			else {
				Commands.add(command, 'Specify two languages for translation', 'error')
			}
		}
	};

	return Translate;
})