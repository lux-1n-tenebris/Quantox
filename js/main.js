// Map Script
// function myMap() {
// var mapProp= {
//     center:new google.maps.LatLng(51.508742,-0.120850),
//     zoom:3,
//     scrollwheel: false,
// };
// var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);
// }

// myMap();


// Smooth Scroll
var $root = $('html, body');

$('a').click(function () {

	$root.animate({

        scrollLeft: $($.attr(this, 'href')).offset().left,
        scrollTop: $($.attr(this, 'href')).offset().top

    }, 600);

    	return false;
});

// Map Script
// Map Options
var directionDisplay;
  var directionsService = new google.maps.DirectionsService();
  var map;
  $(function(){
	$('#submit').click(function(){
		calcRoute();
	});
   calcRoute();
	initialize();
  });

  // initialize the Google Map aplication programming interface.
  function initialize() {
    directionsDisplay = new google.maps.DirectionsRenderer();
    var Serbia = new google.maps.LatLng(44.016521, 21.005859);
    var mapOptions = {
      zoom: 7,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      center: Serbia,
      scrollwheel: false
    }

    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    directionsDisplay.setMap(map);
  }

  //Find the Start and End Destination on google Map
  function calcRoute() {
    var start = document.getElementById('start').value;
    var end = document.getElementById('end').value;
    var request = {
        origin:start,
        destination:end,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    };
    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      }
    });
  }

  // Autocomplete
var mapOptions = {
    center: new google.maps.LatLng(44.016521, 21.005859),
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};

var map = new google.maps.Map(document.getElementById('map'), mapOptions);
var acOptions = {
  types: []
};
  var autocomplete = new google.maps.places.Autocomplete(document.getElementById('start'),acOptions);
  var autocomplete = new google.maps.places.Autocomplete(document.getElementById('end'),acOptions);
  var autocomplete = new google.maps.places.Autocomplete(document.getElementById('search'),acOptions);
autocomplete.bindTo('bounds',map);
var infoWindow = new google.maps.InfoWindow();
var marker = new google.maps.Marker({
  map: map
});

google.maps.event.addListener(autocomplete, 'place_changed', function() {
  infoWindow.close();
  var place = autocomplete.getPlace();
  if (place.geometry.viewport) {
    map.fitBounds(place.geometry.viewport);
  } else {
    map.setCenter(place.geometry.location);
    map.setZoom(17);
  }
  marker.setPosition(place.geometry.location);
  infoWindow.setContent('<div><strong>' + place.name + '</strong><br>');
  infoWindow.open(map, marker);
  google.maps.event.addListener(marker,'click',function(e){

    infoWindow.open(map, marker);

  });
});


