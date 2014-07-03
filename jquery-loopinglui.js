!function($) {

  var circulate = function(arr) {
    var len = arr.length, pos = -1;
    return !len ? void 0 : function() {
      return arr[pos = ++pos % len];
    }
  };

  var bgUpdater = function($el, css) {
    return function(url) {
      $el.css($.extend({}, css, {
        'background-image' : 'url('+url+')'
      }));
    };
  };

  var imageLoader = function() {
    var memo = {};
    return function(img, cb) {
      if (memo[img]) return setTimeout(function() {
        cb(img);
      }, 0);
      $('<img />').one('load', function() {
        memo[img] = true;
        cb(img);
      }).attr('src', img);
    };
  };

  $.fn.loopingLui = function(opts) {
    var options = $.extend({}, {
      images: [],
      delay: 10000,
      css: {
        'background-position': 'center top',
        'background-attachment': 'fixed',
        transition: 'background 0.5s linear',
        'background-size': 'cover'
      }
    }, opts);

    var loader = imageLoader();
    var updater = bgUpdater(this, options.css);
    var next = circulate(options.images);

    var showNextImage = function() {
      loader(next(), function(img) {
        updater(img);
      });
    };

    setInterval(showNextImage, options.delay);
    showNextImage();

    return this;
  };

}(jQuery);