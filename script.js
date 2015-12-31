

(function(window,document,google){

	var userPosition = {"lat":0,"lng":0};

	

	//{lat: -34.397, lng: 150.644}

	var element = document.getElementById("map-canvas");

	var options = {
		center:userPosition,
		zoom:3,
		disableDefaultUI:true
	};

	if(window.google === "undefined"){
		alert("Google map api not loaded , pleasse reload");
	}

	var map = new google.maps.Map(element,options);

	// Set my positions
	
	if (window.navigator.geolocation) {
	        window.navigator.geolocation.getCurrentPosition(function(position){
	        	console.log(position);

	        	userPosition.lat = position.coords.latitude;
	        	userPosition.lng = position.coords.longitude;
	        	map.setCenter({'lat':userPosition.lat,'lng':userPosition.lng});

	        	map.setZoom(16);
	        	console.info(map.data);
	        	// setTimeout(function(){
	        	// 	console.log('PAAM');
	        	// 	map.panBy(0,0);
	        	// },3000);
	        	// var ZoomInterval = setInterval(function(){
	        	// 	map.setZoom(options.zoom++);
	        	// 	console.log(options.zoom);
	        	// 	if(options.zoom==14){
	        	// 		clearInterval(ZoomInterval);
	        	// 	}
	        	// },3000);
	        	
	        	// Testing
	        	console.info("Test",map.getHeading());
	        	console.info("Test",map.getDiv());
	        	console.info("Test",map.getMapTypeId());
	        	console.info("Test",map.getProjection());
	        	console.info("Test",map.getDiv());

	        });
	    }
	    else{
	    	console.log("Browser not support");
	    }


	    // Place Auto complte
	    var input = (document.getElementById('pac-input'));

 	 // Create the autocomplete helper, and associate it with
  	// an HTML text input box.
 	 var autocomplete = new google.maps.places.Autocomplete(input);
  	autocomplete.bindTo('bounds', map);


  	// Listen for change event
  	google.maps.event.addListener(autocomplete, 'place_changed', function() {
  	
  		  var place = autocomplete.getPlace();
	    if (!place.geometry) {
	      return;
	    }

	    if (place.geometry.viewport) {
	      map.fitBounds(place.geometry.viewport);
	    } else {
	      map.setCenter(place.geometry.location);
	      map.setZoom(17);
	    }
  	});
	

})(window,document,window.google);