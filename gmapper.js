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