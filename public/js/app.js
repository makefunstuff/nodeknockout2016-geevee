(function($) {

  $(document).ready(function() {
    var container = $('#items_container');
    var dateInputs = $('[data-date]');

    $('[data-toggle="tooltip"]').tooltip();

    $.turbo.use('turbolinks:load', 'turbolinks:render');

    container.imagesLoaded(function() {
      container.masonry({
        itemSelector: '.masonry-item',
        isFitWidth: true
      });
    });

    dateInputs.pickadate();
  });

})(window.jQuery);