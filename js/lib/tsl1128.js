var tsl1128 = {
	scanned: {},
	data: function(info){
		var html = '';
		$.each(info.data, function(key, value){
			if(key !== 'status' && key !== 'location') {
				if(key == 'image') {
					if(value) {
						html += '<b>Image</b><img src="'+value+'" class="img-thumbnail img-responsive" />';
					}
				} else {
					html += '<b>'+key.replace(/_/g, ' ') +': </b>'+value+'<br />';
				}
			}
		});
		return html;
	},
	
	find: function(t){
		if(t.length == 6 || t.length == 12) {
			var found = false;
			if(api.checkConnection()) {
				api.call('action=proFindTag&tag='+t, function(response){
					$('#find .ajaxDisplay').append(user.device.form(response.output));
				});
			} else {
				var db = new simpleDB('request');
				var requests = db.get();
				if(requests) {
					$.each(requests, function(key, request){
						if(typeof request.output.tags != 'undefined') {
							$.each(request.output.tags, function(k, v){
								if(t == v) {
									$('#find .ajaxDisplay').append(tag.form({
										data:request.output.data[k],
										tag:t
									}));
									found = true;
								}
							});
						}
					});				
				} else {
					alert('You are offline and no projects were found.');
				}
				if(found === false) {
					$('#find .ajaxDisplay').append(tag.form({
						data:{},
						tag:t
					}));				
				}
			}
			$('body').trigger('findTag');		
		} else {
			alert('The tag is not valid.');
		}		
	},
	
    init: function(){
		if(cordovaApp) {
			bluetoothSerial.list(function(devices) {
			    devices.forEach(function(device) {
   		 	    	bluetoothSerial.connect(device.id, function(){
						alert('Bluetooth connected successfully.');
						bluetoothSerial.subscribe('\r\n', function(data) {
							if(data.indexOf('EP') != -1) {
								interface.loading('#find .ajaxDisplay');
								var x = $.trim(data.split(':').pop());
								var a = x.match(/.{1,2}/g);
								var t = '';
								$.each(a, function(k, v){
									t += $.trim(String.fromCharCode(hex2dec(v)));
								});
								if(typeof user.device.scanned[t] == 'undefined') {
									user.device.scanned[t] = t;
									user.device.find(t);
								}
							} else if(data.indexOf('BC') != -1) {								
								if($('#myModal').is(':hidden')) {
									interface.loading('#find .ajaxDisplay');
									var x = $.trim(data.split(':').pop());
									if(typeof user.device.scanned[x] == 'undefined') {
										user.device.scanned[x] = x;
										barcode.find(x);
									}
								} else {
									// If myModal is visible, we're doing a global update.
									$('#globalLocation').val(x);
								}
							}
						}, function(){});				
					}, function(){
						alert('Failed to connect to Bluetooth device.');
					});
			    });
			}, function(){
				alert('No bluetooth devices found.');
			});
		} else {
			user.device.find('fafc7ced521e');
		}       
    } 
};