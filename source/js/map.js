'use strict';

(function () {
  var Coord = {
    mobile: {
      X: 59.93905175,
      Y: 30.32380109
    },
    desktop: {
      X: 59.93918535,
      Y: 30.31931648
    }
  };
  var DESKTOP_WIDTH = 1300;

  ymaps.ready(init);

  function init() {
    var map = document.querySelector('.map');
    var myPlacemark;
    var myPin;
    var centerX;
    var centerY;

    if (window.innerWidth < DESKTOP_WIDTH) {
      centerX = Coord.mobile.X;
      centerY = Coord.mobile.Y;
    } else {
      centerX = Coord.desktop.X;
      centerY = Coord.desktop.Y;
    }

    map = new ymaps.Map(map, {
      center: [centerX, centerY],
      zoom: 17
    });

    map.behaviors.disable('scrollZoom'); // отключаем скроллинг карты с помощью колеса мыши

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      // отключаем перетаскивание карты на мобильных устройствах
      map.behaviors.disable('drag');
    }

    map.controls
      .remove('geolocationControl')
      .remove('searchControl')
      .remove('trafficControl')
      .remove('typeSelector')
      .remove('rulerControl');

    myPin = new ymaps.GeoObjectCollection({}, {
      iconLayout: 'default#image',
      iconImageHref: 'img/map-pin.png',
      iconImageSize: [124, 106],
      iconImageOffset: [-60, -90]
    });

    myPlacemark = new ymaps.Placemark([59.93881674, 30.32314423], {

    });

    myPin.add(myPlacemark);
    map.geoObjects.add(myPin);

  }
})();
