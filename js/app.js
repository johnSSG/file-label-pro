var app = {
	checkSession: function(){
		var db = new simpleDB('user');
		var session = db.get('session');
		if(session) {
			api.call('action=checkSession&token='+session.user.token, function(response){
				if(response.output.logged_in === false) {
					alert('Your session has expired, please log in.');
					db.del('session');
					app.init();
				}
			});
		}
	},
	
	init: function(){
		interFace.init();
		app.checkSession();		
		var i = setInterval(function(){
			app.checkSession();
		}, 300000);		
		api.url = config.apiUrl;
		if(user.loggedIn()) {
			interFace.projects();
		} else {
			interFace.loginForm();
		}
	}
};