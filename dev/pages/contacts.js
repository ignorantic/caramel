import GoogleMapsLoader from 'google-maps';
import Navigation from '../js/lib/components/navigation/navigation';
import Feedback from '../js/lib/components/feedback/feedback';
import './common.scss';
import './contacts.scss';

const app = {};

document.addEventListener('DOMContentLoaded', () => {
  app.nav = new Navigation();

  app.feedbackForm = new Feedback({
    form: {
      id: 'feedback-form',
    },
    fields: [{
      id: 'input-first-name',
      type: 'text',
      label: 'Ваше имя',
      placeholder: 'Ваше имя',
      error: 'Введите ваше имя',
    }, {
      id: 'input-last-name',
      type: 'text',
      label: 'Ваша фамилия',
      placeholder: 'Ваша фамилия',
      error: 'Введите вашу фамилию',
    }, {
      id: 'input-email',
      type: 'email',
      label: 'Ваш e-mail',
      placeholder: 'Ваш e-mail',
      error: 'Введите ваш e-mail',
    }, {
      id: 'input-body',
      type: 'text',
      label: 'Ваше сообщение',
      placeholder: 'Ваше сообщение',
      error: 'Введите ваше сообщение',
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
  app.googleMaps = GoogleMapsLoader.load((google) => {
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
