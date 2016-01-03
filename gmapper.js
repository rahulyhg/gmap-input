(function(window,google){
	console.log("gmapper loaded");

	var gmapper = (function(){
		var gmapper = function(element,options){

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
		gmapper.prototype={
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

			// Places autocomplete
			makeAutocomplteElement:function(){

				this.autocompleteEl = document.createElement('input');
				this.autocompleteEl.setAttribute('type','text');
				this.autocompleteEl.style.cssText = "z-index:10;position:relative;width:100%;";
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

		return gmapper;
	}());

	window.gmapper = gmapper;

	if(window.google === undefined){
		
	}

}(window,google));

mapoptions = {
				center:{lat: -34.397, lng: 150.644},
				zoom:9,
				disableDefaultUI:true
			}

gmap = new window.gmapper('map-canvas',mapoptions);
gmap.initMap();
gmap._on('click',function(){
	alert('click');
	console.log(this);
});
gmap.initAutocomplete();