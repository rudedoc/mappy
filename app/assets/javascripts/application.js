// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
// = require_tree .

$(window).load(function() {
    //Unnecessary - create custom tag in the application/layout
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp' + '&v=3.14&key=AIzaSyBJYFdplGeKUUEmGZ-vL4ydiSZ09Khsa_o&libraries=drawing&callback=initialize';
    document.body.appendChild(script);
});

var map;
function initialize() {

    // map options

    var hub_lat = 40.758867;
    var hub_long = -73.985045;
    var mapOptions = {
        center: new google.maps.LatLng(hub_lat, hub_long),
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.NORMAL,
        panControl: true,
        scaleControl: false,
        streetViewControl: true,
        overviewMapControl: true
    };
    // initializing map
    map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);

    // Loop to get posts
    setInterval(
        function(){
            $.getJSON('/map/posts', function(data){
                var posts = data.posts
                $.each(posts, function(index, value){
                    new_point(value.id, value.latitude, value.longitude, value.handle, map)
                })
            });
            // Loop through posts and create new points
        }
        , 10000)
}

function new_point (id, lat, long, handle, map){
    var new_point = new google.maps.LatLng(lat, long);
    var new_marker = new google.maps.Marker({
        id: id,
        position: new_point,
        map: map,
        title: handle
    });
}

