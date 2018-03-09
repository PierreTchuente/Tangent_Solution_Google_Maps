import _ from 'angular';

var mainMod = angular.module('mainApp', []);
mainMod.controller('mainController', ['$scope', function($scope) {

    var initialiseMap = function() {

        //Default Position.
        var defaultPosition = {
            lat: -26.39794,
            lng: 27.6944
        };
        var map = new google.maps.Map(document.getElementById('mapID'), {
            zoom: 17,
            center: defaultPosition
        });
        var marker = new google.maps.Marker({
            position: defaultPosition,
            map: map
        });

        if (navigator.geolocation) {
            //Starting from the user current location.
            navigator.geolocation.getCurrentPosition(function(position) {
                defaultPosition.lat = position.coords.latitude;
                defaultPosition.lng = position.coords.longitude;

                console.log(defaultPosition);

                map.setCenter(defaultPosition);
            });
        } else {
            console.log("Browser does not support Geolocation.");
        }

        var inputSeachElem = document.getElementById('inputSeachID');
        var autocomplete = new google.maps.places.Autocomplete(inputSeachElem);

        autocomplete.addListener('place_changed', function() {

            marker.setVisible(false);
            var place = autocomplete.getPlace();
            if (!place.geometry) {
                // if the place has not been sugested.
                window.alert("No details available for input: '" + place.name + "'");
                alert("Sorry!! could not find " + place.nane);
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
            marker.setPosition(place.geometry.location);
            marker.setVisible(true);
        });
    }

    initialiseMap(); // initialise the map.
}]);