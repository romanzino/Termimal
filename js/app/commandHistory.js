define(['views/commandInput'], function (commandInput) {
	var commandHistory = {
		pos: -1,
		list: [],
		init: function () {
			var context = this,
				length;

			$(window).keyup(function (event) {
				length = context.list.length;

				//38 - up key
				if (event.keyCode === 38) {
					if ((length-1) - context.pos > 0) {
						context.pos++;
					}
				}
				//40 - down key
				else if (event.keyCode === 40) {
					if (context.pos <= length && context.pos >= 1) {
						context.pos--;
					}
					else if (context.pos === 0) {
						commandInput.clear();
						context.pos = -1;
						return;
					}
				}
				else {
					return;
				}

				if (length > 0) {
					commandInput.setValue(context.list[context.pos]);
				}
			});
		},
		remember: function (command) {
			this.list.unshift(command);
			this.pos = -1;
		}
	};

	return commandHistory;
})