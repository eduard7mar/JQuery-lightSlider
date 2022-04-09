$(document).ready(function () {
  let autoplaySlider = $("#lightSlider").lightSlider({
    autoWidth: true,
    item: 1,
    slideMove: 1,
    auto: true,
    loop: true,
    pause: 5000,
    pauseOnHover: true,
    onBeforeSlide: function (el) {
      $("#current").text(el.getCurrentSlideCount());
    },
  });
  $("#total").text(autoplaySlider.getTotalSlideCount());
});
