define(['text!template/addMessage.html', 'text!template/errorMessage.html', 'models/config', 'views/commandInput'], function (addMessageTemplate, errorMessageTemplate, Config, commandInput) {

	var commandsView = Backbone.View.extend({
		el: "#command",
		addMsgtemplate: _.template(addMessageTemplate),
		errorMsgTemplate: _.template(errorMessageTemplate),
		templates: {
			'error': 'errorMsgTemplate',
			'success': 'addMsgtemplate'
		},
		initialize: function () {
			this.parent = this.$el.parent();
		},
		add: function (command, msg, type) {
			if (!type) {
				type = 'success';
			}
			else if (type === 'error') {
				if (msg === 'server') {
					msg = Config.get('errorServer');
				}
			}
			
			this.$el.append(this[this.templates[type]]({
				user: Config.get('username'),
				message: msg ? msg : Config.get('errorDefault'),
				command: command
			}));

			commandInput
				.clear()
				.enable();

			this.parent.animate({
				scrollTop: this.parent[0].scrollHeight
			}, 250);
		},
		clear: function () {
			this.$el.html('');
		}
	});

	return new commandsView;
})