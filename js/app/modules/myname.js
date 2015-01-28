define(['models/config', 'views/commands'], function (Config, Commands) {
	var MyName = Backbone.View.extend({
		el: ".username",
		/**
		 * Command description
		 * @type {String}
		 */
		descr: "Sets your name. <br>Example: <span class='command-example'>myname is Petro</span>",
		/**
		 * Keyword
		 * @type {String}
		 */
		word: 'myname',

		initialize: function () {
			this.model.on("change:username", this.success, this);
			this.model.on("invalid", this.error, this);
		},

		process: function (command) {
			var commandArr = command.split(" ");
			this.command = command;

			if (commandArr.length === 3 && commandArr[1] === 'is') {
				this.model.set('username', commandArr[2], {
					validate: true
				});
			}
			else {
				Commands.add(command, null, 'error');
			}
		},

		success: function () {
			var username = this.model.get('username');

			this.$el.html(username);
			Commands.add(this.command, 'Your name successfully changed to: ' + username);
		},

		error: function () {
			Commands.add(this.command, this.model.validationError, 'error');
		}
	});

	return new MyName({
		model: Config
	});
})