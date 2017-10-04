import GoogleMapsLoader from 'google-maps';
import Navigation from '../js/lib/components/navigation/navigation';
import FeedbackForm from '../js/lib/components/feedback';
import './common.scss';
import './contacts.scss';

const app = {};

document.addEventListener('DOMContentLoaded', () => {
  app.nav = new Navigation();

  app.feedbackForm = new FeedbackForm({
    form: {
      id: 'feedback-form',
    },
    fields: [{
      id: 'input-first-name',
      type: 'text',
      error: 'Invalid first name',
    }, {
      id: 'input-last-name',
      type: 'text',
      error: 'Invalid last name',
    }, {
      id: 'input-email',
      type: 'email',
      error: 'Invalid email',
    }, {
      id: 'input-body',
      type: 'text',
      error: 'Invalid message body',
    }],
    submit: {
      id: 'submit-btn',
    },
    message: {
      id: 'message',
    },
    classes: {
      inputError: 'input_state_error',
      messageNone: 'message_none',
      messageError: 'message_type_error',
      messageSuccess: 'message_type_success',
    },
  });

  GoogleMapsLoader.KEY = 'AIzaSyB0ActUGaLxSQdUaN6RdrNiCEvmMIoDa78';
  GoogleMapsLoader.load((google) => {
    let map;
    let marker;
    const caramel = new google.maps.LatLng(47.1046618, 37.6371097);

    function initTrack(position) {
      const directionsDisplay = new google.maps.DirectionsRenderer();
      const directionsService = new google.maps.DirectionsService();
      const request = {
        origin: position,
        destination: caramel,
        travelMode: 'WALKING',
      };

      directionsService.route(request, (response, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
        }
      });

      directionsDisplay.setMap(map);
    }

    function initMarker(position) {
      marker = new window.google.maps.Marker({
        position,
        map,
      });

      map.setCenter(marker.getPosition());
    }

    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: {
        lat: 47.1046618,
        lng: 37.6371097,
      },
    });

    map.setOptions({
      styles: [
        {
          featureType: 'poi',
          elementType: 'geometry.fill',
          stylers: [
            {
              color: '#eab7e7',
            },
          ],
        },
      ],
    });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        initTrack(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
      },
      () => {
        initMarker(caramel);
      },
    );
  });
});
