$(document).ready(function() {
  function charCounter() {
    var currCount =  $(this).val().length;
    var counterElement = $(this).siblings('span').html(140 - currCount);

    if (currCount > 140) {
      $(counterElement).addClass('over-limit')
    } else {
      $(counterElement).removeClass('over-limit');
    }
  }
  $('.input-tweet').on("input", charCounter);
});
