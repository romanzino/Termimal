define(['views/commandInput', 'views/commands', 'commandHistory'], function (CommandInput, Commands, CommandHistory) {
	var terminalView = Backbone.View.extend({
		el: '.terminal',
		events: {
			'click': 'clickHandler',
			'submit #commandForm': 'commandHandler'
		},
		initialize: function (modules) {
			this.modules = modules;
		},
		clickHandler: function () {
			CommandInput.$el.focus();
		},
		commandHandler: function (event) {
			event.preventDefault();

			var command = CommandInput.getValue(),
				key,
				keys,
				keysLength,
				appContext = this;

			if (command.length > 3) {
				CommandHistory.remember(command);
				CommandInput.disable();

				//Get keys from command
				keys = command.match(/--[a-z]+/g);

				for (key in appContext.modules) {
					if (command.indexOf(appContext.modules[key].word) === 0) {
						appContext.modules[key].process(command.replace(/\s{2,}/g, " "), keys, appContext.modules);
						return;
					}
				}
				Commands.add(command, 'command not found', 'error');
			}
		}
	});

	return terminalView;
})