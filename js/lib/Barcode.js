function Barcode(selector, callback) {
	this.init = function(){
		this.exists = true;
		if(!$('#barcodeReader').length && !$('#barcodeLoader').length && !$('#barcodeBlocker').length) {
			this.exists = false;
			$('body').append('<input id="barcodeReader" />');
			$('body').append('<div id="barcodeLoader" />');
			$('body').append('<div id="barcodeBlocker" />');
			$('#barcodeReader').css({
				'position':'fixed',
				'z-index':'100',
				'top':'-999px'
			});
			ui.loading('#barcodeLoader');
			$('#barcodeLoader').css({
				'outline':'9999px solid rgba(0, 0, 0, 0.25)',
				'min-height':'100px',
				'width':'290px',
				'text-align':'center',
				'padding-top':'15px',
				'position':'absolute',
				'top':'50%',
				'left':'50%',
				'z-index':'100',
				'margin-left':'-145px',
				'margin-top':'-50px',
				'display':'none',
				'cursor':'pointer',
				'background-color':'#fff'
			}).text('Please scan a barcode. Click to close.');
			$('#barcodeBlocker').css({
				'display':'none',
				'position':'fixed',
				'top':'0',
				'right':'0',
				'bottom':'0',
				'left':'0',
				'width':'100%',
				'height':'1000px',
				'overflow':'hidden',
				'z-index':'99',
				'background':'rgba(0, 0, 0, 0.5)'
			});			
		}
		this.events();
	};

	this.events = function(){
		$(document).on('click', selector, function(){
			$('#barcodeReader').trigger('focus');
		});
		if(this.exists === false) {
			$(document).on('focus', '#barcodeReader', function(){
				$('#barcodeLoader, #barcodeBlocker').show();
			});
			$(document).on('click', '#barcodeLoader', function(){
				$('#barcodeLoader, #barcodeBlocker').hide();
			});
		}
		$(document).on('keyup', '#barcodeReader', function(){
			ui.delay(function(){
				var barcode = encodeURIComponent($('#barcodeReader').val());
				$('#barcodeReader').val('');
				if(barcode) {
					if(typeof callback == 'function') {
						callback(barcode);
						$('#barcodeReader').trigger('focus');
					}
				}
			}, 250);
		});
	};
	
	this.init();
}