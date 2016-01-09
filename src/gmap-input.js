(function(window,google){

	var gmapInput = (function(){
		var gmapInput = function(element,options){

			this.defalutOpt = {
				center:{'lat':0,'lng':0},
				zoom:3,
				disableDefaultUI:true
			};

			this.options = options || this.defalutOpt;
			this.element = document.getElementById(element);

			// Autocomplte
			this.autocompleteEl = null ;
			this.autocomplete = null ;

		}
		gmapInput.prototype={
			initMap : function(){
			this.map = new google.maps.Map(this.element,this.options);
			console.info(this.options);
			},

			_on:function(event,callback){

				var self = this;

				google.maps.event.addListener(this.map,event,function(e){

					callback.call(self,e);

				});

			},

			// Event for autocomplte
			_onAutoComplete:function(event,callback){

				var self = this;
				google.maps.event.addListener(self.autocomplete,event, function(e) {

					callback.call(self,e);

				});

			},

			// Places autocomplete
			makeAutocomplteElement:function(){

				this.autocompleteEl = document.createElement('input');
				this.autocompleteEl.setAttribute('type','text');
				this.autocompleteEl.classList.add('gmap-auto-input');
				this.autocompleteEl.style.cssText = "z-index:10;position:relative;width:99.56%;";
				// this.autocompleteEl.addEventListener('click',function(e){
				// 	alert('autocomplete');
				// });
				
				this.element.appendChild(this.autocompleteEl);


			},

			initAutocomplete :function(){
				this.makeAutocomplteElement();
				this.autocomplete = new google.maps.places.Autocomplete(this.autocompleteEl);
				

				this.registerAutocomplteChangeEvent();
			},
			registerAutocomplteChangeEvent:function(){
				var self = this;
				google.maps.event.addListener(self.autocomplete, 'place_changed', function() {
  	
			  		  var place = self.autocomplete.getPlace();
				    if (!place.geometry) {
				      return;
				    }

				    if (place.geometry.viewport) {
				      self.map.fitBounds(place.geometry.viewport);
				    } else {
				      self.map.setCenter(place.geometry.location);
				      self.map.setZoom(17);
				    }
			  	});

			}
		};

		return gmapInput;
	}());

	window.gmapInput = gmapInput;

	if(window.google === undefined){
		
	}

}(window,google));