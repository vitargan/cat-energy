'use strict';

(function () {
  var PinValue = {
    MIN: 0,
    MAX: 100,
    MOBILE_MIN: 27,
    MOBILE_MAX: 74
  };
  var PictureWidth = {
    MIN: 0,
    MAX: 100
  };
  var TABLET_WIDTH = 768;
  var slider = document.querySelector('.slider');
  var sliderPicture = slider.querySelector('.slider__item--before');
  var sliderLine = slider.querySelector('.slider__controls-bar');
  var sliderPin = slider.querySelector('.slider__controls-toggle');
  var sliderButtonBefore = slider.querySelector('.slider__control--before');
  var sliderButtonAfter = slider.querySelector('.slider__control--after');

  var setPinPosition = function (value) {
    sliderPin.style.left = value + '%';
  };

  var setPictureWidth = function (value) {
    sliderPicture.style.width = PictureWidth.MAX - value + '%';
  };

  var changePicture = function (direction) {
    // Если ширина устройства меньше планшета
    if (window.innerWidth < TABLET_WIDTH) {
      if (direction < 0) {
        setPictureWidth(PictureWidth.MIN);
        sliderPin.style.left = PinValue.MOBILE_MIN + '%';
      } else {
        setPictureWidth(PictureWidth.MAX);
        sliderPin.style.left = PinValue.MOBILE_MAX + '%';
      }
    } else { // Если ширина устройства от планштеа и выше
      if (direction < 0) {
        setPictureWidth(PictureWidth.MIN);
        sliderPin.style.left = PinValue.MIN + '%';
      } else {
        setPictureWidth(PictureWidth.MAX);
        sliderPin.style.left = PinValue.MAX + '%';
      }
    }
  };

  var onMouseDown = function (evt) {
    var startCoord = evt.clientX;
    var sliderLineRect = sliderLine.getBoundingClientRect();
    var clickedPosition = (startCoord - sliderLineRect.left) / sliderLineRect.width * 100;

    setPinPosition(clickedPosition);
    setPictureWidth(clickedPosition);

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = startCoord - moveEvt.clientX;
      startCoord = moveEvt.clientX;

      var movePosition = (sliderPin.offsetLeft - shift) / sliderLineRect.width * 100;

      if (movePosition <= PinValue.MIN) {
        movePosition = PinValue.MIN;
      } else if (movePosition >= PinValue.MAX) {
        movePosition = PinValue.MAX;
      }

      setPinPosition(movePosition);
      setPictureWidth(movePosition);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  sliderButtonBefore.addEventListener('click', function () {
    changePicture(-1);
  });
  sliderButtonAfter.addEventListener('click', function () {
    changePicture(1);
  });
  sliderLine.addEventListener('mousedown', onMouseDown);
})();
