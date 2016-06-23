var item = {
	display: function(response, val, type){
		var t = 'data-barcode';
		if(type == 'rfid' ) {
			var t = 'data-tag';
		}
		if(typeof response.output.data != 'undefined') {
			$('#tagDisplay').append(library.displayObject(response.output.data));					
			$('#tagDisplay').find('pre:last-child')
			.attr(t, val)
			.attr('title', 'Edit')
			.attr('data-uri', $.param(response.output.data))
			.attr('data-project', response.output.project)
			.attr('data-id', response.output.id);
		} else {
			alert('Not found.');
		}
	},
	
	edit: function(t){
		var data = deparam($(t).attr('data-uri'));
		var id = $(t).attr('data-id');
		var project = $(t).attr('data-project');
		$("body, pre").css("cursor", "progress");
		api.call('action=getProjectMeta&project='+project+'&token='+user.session.user.token, function(response){
			$("body, pre").css("cursor", "default");
			if(response.output.form) {
				$('#formModal').modal('show');
				var f = new Form({
					target:'#formModal .modal-body',
					form:response.output.form.form,
					data:data,
					event: function(){
						var o = {};
						o.data = {};
						o.data[id] = $('#formModal form').serializeObject();
						var d = $.param(o);
						api.call('action=proEdit&token='+user.session.user.token+'&project='+project+'&'+d, function(response){
							$('pre[data-id="'+id+'"]').fadeOut('fast', function(){
								$(this).remove();
								var tags = $('#tagDisplay pre').length;
								if(tags) {
									$('#tagDisplay pre:first-child').trigger('click');
								} else {
									$('#formModal').modal('hide');
								}
							});
						});
					}
				});
			}
		});
	},
	
	show: function(response, val){
		$('#commissionDisplay').html(library.displayObject(response.output.data));
		$('#commissionDisplay').find('pre')
		.attr('data-tag', response.output.tag)
	}
};