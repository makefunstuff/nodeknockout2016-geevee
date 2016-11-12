(function($) {

  $(document).ready(function() {
    var container = $('#items_container');

    container.imagesLoaded(function() {
      container.masonry({
        itemSelector: '.masonry-item',
        isFitWidth: true
      });
    });
  });

})(window.jQuery);