requirejs.config({
	waitSeconds: 60,
	baseUrl: 'js/app',
	paths: {
		'jquery': '../lib/jquery-2.1.3.min',
		'underscore': '../lib/underscore',
		'backbone': '../lib/backbone',
		'text': '../lib/requirejs.text',
		'template': '../../templates',
		'mtemplate': '../../templates/modules'
	},
	shim: {
		backbone: {
			deps: ['underscore', 'jquery']
		},
		app: {
			deps: ['backbone']
		}
	}
});

require(['app', 'backbone'], function (App) {
	$(function () {
		App.init();
	});
})

