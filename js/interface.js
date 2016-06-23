var interFace = {
	clear: function(t) {
		var el = $(t).attr('data-clear');
		$(el).html('');
	},

	init: function(){
		
	},

	loginForm: function(){
		interFace.loginForm = new Form({
			target:'#logIn .form',
			form:forms.login,
			bootstrap:false,
			event: function(){
				api.call($('#logIn form').serialize(), function(response){				
					var db = new simpleDB('user');
					db.put('session', response.output);
					user.session = response.output;
					user.account();
					$("#logIn").dialog("close");
				});
			}
		}, function(f){
			$('#logIn form').find('button').parents('div:first').removeAttr('class');
			$.mobile.changePage( "#logIn", { role: "dialog" } );
		});
	},
	
	projects: function(){
		var db = new simpleDB('user');
		var session = db.get('session');
		user.session = session;
		user.prefs = new Preferences();
		$('#device').val(user.prefs.device);
		user.changeDevice();
		$('#toggleAutoUploader').prop('checked', user.prefs.enableUploader);
		user.account();
		var projects = '<option value="">Please Select a Project</option>';
		if(session) {
			try {
				$.each(session.user.projects, function(key, value){
					projects += '<option value="'+key+'">'+library.key(value.name)+'</option>';
				});			
			} catch(e) {}
		}
		$('#projects').html(projects);
	},
	
	selector: function(t){
		$(t).parents('.selector:first').find('button').removeClass('active');
		$(t).addClass('active');
		var type = $(t).attr('data-type');
		$('.scan').attr('id', type);
	}
};