var uploader = {		
	file: function(t){		
		$('#autoUploaderChosenFile').html(user.prefs.uploaderFile);
		var file = uploader.getFile();
		var oldHash = user.prefs.uploaderHash;
		var hash = CryptoJS.SHA1(base64.encode(file));
		user.prefs.uploaderFile = (typeof t == 'undefined' ? $('#autoUploaderChosenFile').html() : $('#autoUploaderFile').val());
		user.prefs.uploaderHash = hash.toString();
		var prefs = new Preferences(user.prefs);
		user.prefs = prefs;
		if(user.prefs.enableUploader) {
			if(user.prefs.uploaderHash !== oldHash) {
				uploader.send(file);
			}
		}
	},
	
	getFile: function(){
		var fso = new ActiveXObject("Scripting.FileSystemObject");
		if(fso.FileExists(user.prefs.uploaderFile)) {
			var s = fso.OpenTextFile(user.prefs.uploaderFile, 1);
			var text = s.ReadAll();
			s.Close();
			return text;
		} else {
			return '';
		}
	},
	
	init: function(){
		if(typeof i != 'undefined') {
			clearInterval(i);
		}
		if(typeof user.prefs != 'undefined') {			
			if(user.prefs.enableUploader && user.prefs.apiKey) {
				var i = setInterval(function(){
					if(user.prefs.uploaderFile && user.prefs.enableUploader && user.prefs.apiKey) {
						uploader.file();
					}
				}, 300000);
			} else {
				if(typeof i != 'undefined') {
					clearInterval(i);
				}
			}
		} else {
			if(typeof i != 'undefined') {
				clearInterval(i);
			}			
		}
	},	
	
	send: function(file){
		if(user.prefs.apiKey) {
			var type = uploader.type();
			alert(type);
			if(type) {
				api.call('action=import&upload='+base64.encode(file)+'&apiKey='+user.prefs.apiKey+'&type='+type);
			}
		} else {
			alert('To use the auto uploader, you need to enter your API key from My Account on filelabel.co.');
		}
	},
	
	toggle: function(){
		user.prefs.enableUploader = (user.prefs.enableUploader ? false : true);
		var prefs = new Preferences(user.prefs);
		user.prefs = prefs;
		uploader.init();
	},
	
	type: function(){
		if(user.prefs.uploaderFile) {
			if(String(user.prefs.uploaderFile).indexOf('.csv') != -1) {
				return 'csv';
			} else if(String(user.prefs.uploaderFile).indexOf('.xls') != -1) {
				return 'xls';
			} else if(String(user.prefs.uploaderFile).indexOf('.xlsx') != -1) {
				return 'xlsx';
			} else {
				return false;
			}
		} else {
			return false;
		}
	}
};