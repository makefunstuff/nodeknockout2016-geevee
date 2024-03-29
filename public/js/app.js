(function($) {

  $(document).ready(function() {
    var container = $('#items_container');
    var dateInputs = $('[data-date]');

    $('[data-toggle="tooltip"]').tooltip();

    container.imagesLoaded(function() {
      container.masonry({
        itemSelector: '.masonry-item',
        isFitWidth: true
      });
    });

    dateInputs.pickadate();
  });

})(window.jQuery);