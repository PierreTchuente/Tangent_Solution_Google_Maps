import _ from 'angular';

var mainMod = angular.module('mainApp', []);
mainMod.controller('mainController', ['$scope', function($scope) {

    var initialiseMap = function(userCurrentLatLng) {

        var map = new google.maps.Map(document.getElementById('mapID'), {
            zoom: 17,
            center: userCurrentLatLng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        var marker = new google.maps.Marker({
            map: map,
            animation: google.maps.Animation.DROP,
            position: userCurrentLatLng,
        });

        var inputSeachElem = document.getElementById('inputSeachID');
        var autocomplete = new google.maps.places.Autocomplete(inputSeachElem);

        autocomplete.addListener('place_changed', function() {

            marker.setVisible(false);
            var place = autocomplete.getPlace();
            if (!place.geometry) {

                // if the place has not been sugested.
                console.log(place.name);
                alert("Sorry!! could not find " + place.name);
                return false;
            }

            console.log(place);

            //if we have a geometriy position, present on the map.
            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(17);
            }

            marker.setVisible(true);
            marker.setAnimation(google.maps.Animation.DROP);
            marker.setPosition(place.geometry.location);
        });
    }

    if (navigator.geolocation) {

        //Starting from the user current location.
        navigator.geolocation.getCurrentPosition(function(position) {

            var userCurrentLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            console.log(userCurrentLatLng); // log out the user current coordonate
            initialiseMap(userCurrentLatLng); // initialise the map.           
        });
    } else {
        console.log("Browser does not support Geolocation.");
    }

}]);