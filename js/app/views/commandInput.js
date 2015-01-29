define(function () {
	var commandInput = Backbone.View.extend({
		el: "#commandInput",
		disable: function () {
			this.$el
				.attr('disabled', 'disabled')
				.css('cursor', 'wait');
		},
		enable: function () {
			this.$el
				.removeAttr('disabled')
				.css('cursor', 'default')
				.focus();
		},
		getValue: function () {
			return this.$el
				.val()
				.trim();
		},
		setValue: function (value) {
			this.$el.val(value);
		},
		clear: function () {
			this.$el.val('');
			return this;
		}
	});

	return new commandInput;
})