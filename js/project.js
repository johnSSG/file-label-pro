var project = {
	createReport: function(t){
		var list = ($(t).hasClass('createReport') ? 'Report' : 'List');
		if($('#tagDisplay pre').length) {
			var projects = [];
			$('#tagDisplay').find('pre').each(function(key, value){
				var project = $(this).attr('data-project');
				if($.inArray(project, projects) == -1) {
					projects.push(project);
				}
			});
			var go = true;
			if(projects.length > 1) {
				go = confirm('You have selected items from different projects. '+projects.length+' '+list.toLowerCase()+'s will be created.');
			}
			if(go) {
				var report = {};
				report.data = {};
				$.each(projects, function(key, projectId){
					$('#tagDisplay').find('pre').each(function(key, value){
						var project = $(this).attr('data-project');
						if(project == projectId) {
							var id = $(this).attr('data-id');
							report.data[id] = (list == 'Report' ? deparam($(this).attr('data-uri')) : id);
						}
					});
					var name = prompt(list+' Name (Required)', '');
					if(list == 'Report') {
						var notes = prompt('Notes (Not Required)', '');
					}
					if(name) {
						var method = (list == 'Report' ? 'proCreateReport' : 'proSaveList');
						api.call(
						'action='+method+'&project='+projectId+
						'&token='+user.session.user.token+
						'&'+$.param(report)+
						'&name='+name+
						'&notes='+notes, function(response){
							if(list == 'Report') {
								window.open(response.output.report);
							} else {
								alert('List saved.');
							}
						});
					} else {
						alert('Please provide a name for the report.');
					}
				});						
			}
		} else {
			alert('You have not selected anything.');
		}
	},
	
	load: function(t){
		var id = $(t).val();
		if(id) {
			ui.loading('#project');
			api.call('action=proGet&project='+id+'&token='+user.session.user.token, function(response){
				project.data = response.output;
				var fields = [];
				var columns = [];
				$.each(project.data.fields, function(key, value){
					fields.push(library.key(value));
					columns.push({data:value});
				});				
				$('#project thead').html('<tr><th>'+fields.join('</th><th>')+'</th></tr>');
				$('#project table').dataTable({
					dom: 'T<"clear">lfrtip',
					"createdRow": function(row, data, dataIndex) {
						if(typeof data.image != 'undefined') {
							if(data.image) {
								$(row).find('td').each(function(){
									var text = $(this).text();
									if(text.indexOf('http') != -1) {
										$(this).html('<img style="max-width:100px;height:auto;" src="'+data.image+'">');
									}
								});
							}
						}
					},
				    destroy: true,
				    "data":library.toArray(project.data.data),
					"columns":columns
				});
				ui.loading('#project', true);
			}, function(){
				ui.loading('#project', true);
			});
			api.call();
		}
	}
};