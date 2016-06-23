var tag = {
	init: function(){}
};
/*
var tag = {
	commission: function(){	
		if($('#barcodeBlocker').is(':hidden')) {
			$("body, button").css("cursor", "progress");
			var tag = $('#commissionDisplay pre').attr('data-tag');
			var shell = new ActiveXObject("WScript.Shell");
			var e = shell.Run("proc\\block "+tag, 0, true);
			var e = shell.Run("proc\\block", 0, true);
			var file = window.tempFolder+'\\fileLabelProTag.txt';
			var fso = new ActiveXObject("Scripting.FileSystemObject");
			var s = fso.OpenTextFile(file, 1, true);
			try {
				var t = s.ReadLine();
			} catch(e) {}
			s.Close();
			if(t == tag) {
				alert('Tag written successfully.');
			} else {
				alert('Error writing the tag, please try again.');
			}
			$("body, button").css("cursor", "default");
		}
	},
	
	init: function(){
		var fso = new ActiveXObject("Scripting.FileSystemObject");
		window.tempFolder = fso.GetSpecialFolder(2);
		fso.CreateTextFile(window.tempFolder+'\\fileLabelProTag.txt', true)
	},
	
	read: function(){
		$("body, button").css("cursor", "progress");
		try {
			var shell = new ActiveXObject("WScript.Shell");
			var e = shell.Run("proc\\block", 0, true);
			var file = window.tempFolder+'\\fileLabelProTag.txt';
			var fso = new ActiveXObject("Scripting.FileSystemObject");
			var s = fso.OpenTextFile(file, 1, true);
			var t = s.ReadLine();
			s.Close();
			if(t) {
				if(!$('#tagDisplay [data-tag="'+t+'"]').length) {
					api.call('action=proFindTag&tag='+t+'&token='+user.session.user.token, function(response){
						item.display(response, t, 'rfid');
						$("body, button").css("cursor", "default");
					});
				} else {
					$("body, button").css("cursor", "default");
				}
			} else {
				$("body, button").css("cursor", "default");
				alert('Tag not read.');
			}
		} catch(e) {
			$("body, button").css("cursor", "default");
			alert('Tag not read.');
		}
	},
	
	revoke: function(){
		var shell = new ActiveXObject("WScript.Shell");
		var e = shell.Run('proc\\block ""', 0, true);
		var e = shell.Run("proc\\block", 0, true);
		var file = window.tempFolder+'\\fileLabelProTag.txt';
		var fso = new ActiveXObject("Scripting.FileSystemObject");
		var s = fso.OpenTextFile(file, 1, true);
		var t = $.trim(s.ReadLine());
		s.Close();
		alert('Tag Value Is: '+t);	
	}
};
*/