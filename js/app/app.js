define(['views/commands', 'views/terminal', 'modules', 'commandHistory'], function (Commands, Terminal, Modules, CommandHistory) {
	var App = {
		/**
		 * Init app
		 */
		init: function () {
			//Welcome message
			Commands.add('Welcome!', "Before start review with console functionality via <span class='command'>help</span> command.");
			//Remember all commands
			CommandHistory.init();
			//Load our modules
			this.modules = Modules.load();
			//Init terminal
			new Terminal(this.modules);
		}
	};

	return App;
})