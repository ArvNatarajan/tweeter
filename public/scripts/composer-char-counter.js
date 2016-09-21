'use strict';

$(document).ready(function() {

  const charCounter = (ev) => {
    const el = ev.target;
    const currCount = $(el).val().length;
    const $counterElement = $('.counter');

    $counterElement.text(140 - currCount)

    if (currCount > 140) {
      $counterElement.addClass('over-limit')
    } else {
      $counterElement.removeClass('over-limit');
    }
  };

  $('#input-tweet').on("input", charCounter);
});
