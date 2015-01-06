(function (window) {

  /**
   * ImageEncoder constructor
   * @param {String} path
   * @param {Number} width
   * @param {Number} height
   * @constructor
   */
  function ImageEncoder(path, width, height) {
    this.path = path || '';
    this.width = width || 1;
    this.height = height || 1;
  }

  /**
   * Set resource path
   * @param {String} path
   */
  ImageEncoder.prototype.setPath = function (path) {
    this.path = path || '';
  };

  /**
   * Set size
   * @param {Number} width
   * @param {Number} height
   */
  ImageEncoder.prototype.setSize = function (width, height) {
    this.width = width || 1;
    this.height = height || 1;
  };
  
  /**
   * Generate dataURI
   * @returns {Promise}
   */
  ImageEncoder.prototype.getDataURI = function () {

    var that = this;

    return new Promise(function (resolve, reject) {
      
      var image = new Image();
      image.setAttribute('crossOrigin','anonymous');

      var onLoad = function (e) {

        var canvas = document.createElement('canvas');
        canvas.width = that.width ? that.width : image.width;
        canvas.height = that.height ? that.height : image.height;

        var context = canvas.getContext('2d');
        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        image.removeEventListener('load', onLoad);
        image.removeEventListener('error', onError);

        resolve(canvas.toDataURL('image/png', 1));
      };

      var onError = function (e) {

        image.removeEventListener('load', onLoad);
        image.removeEventListener('error', onError);

        reject(e);
      };

      image.addEventListener('load', onLoad);
      image.addEventListener('error', onError);
      image.src = that.path;
    });
  };
  
  window.ImageEncoder = ImageEncoder;
  
})(window);