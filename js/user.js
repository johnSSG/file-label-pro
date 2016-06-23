var user = {
	account: function(){
		$('#account-form').find('[name="company"]').val(user.session.user.company);
		$('#account-form').find('[name="name"]').val(user.session.user.name);
		$('#account-form').find('[name="email"]').val(user.session.user.email);
	},
	
	editAccount: function(t){
		api.call($(t).serialize()+'&token='+user.session.user.token, function(response){
			var db = new simpleDB('user');
			var session = db.get('session');
			session.user.company = response.output.user.company;
			session.user.name = response.output.user.name;
			session.user.email = response.output.user.email;
			user.session = session;
			db.put('session', session);
			$('#account-form').find('[name="company"]').val(response.output.user.company);
			$('#account-form').find('[name="name"]').val(response.output.user.name);
			$('#account-form').find('[name="email"]').val(response.output.user.email);
			alert('Account edited.');
		});
	},
	
	changeDevice: function(t){
		var prefs = new Preferences({
			'device':$(t).val()
		});
		user.prefs = prefs;
		switch(user.prefs.device) {
			case 'atid911' :
				user.device = atid911;
				break;
			default :
				user.device = tsl1128;
				break
		}
		user.device.init();
	},
	
	forgotPassword: function(){
		var email = prompt('What is your email?', '');
		if(email) {
			api.call('action=forgotPassword&email='+email, function(response){
				alert('Please click the link in the email we sent you.');
			});
		}
	},
	
	loggedIn: function(){
		var db = new simpleDB('user');
		var session = db.get('session');
		if(session) {
			return true;
		} else {
			return false;
		}
		return false;
	},
	
	logOut: function(){
		var db = new simpleDB('user');
		db.del('session');
		window.location.href = window.location.href.split('#')[0];
	},
	
	saveApiKey: function(t){
		var key = $(t).val();
		user.prefs.apiKey = key;
		var prefs = new Preferences(user.prefs);
		user.prefs = prefs;
	}
};