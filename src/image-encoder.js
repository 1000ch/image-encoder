(function (window) {

  /**
   * ImageEncoder constructor
   * @param {String} path
   * @constructor
   */
  function ImageEncoder(path) {
    
    if (!path) {
      throw new Error('Invalid argument');
    }
    
    this.path = path;
    this.width = null;
    this.height = null;
  }

  /**
   * Set resource path
   * @param {String} path
   */
  ImageEncoder.prototype.setPath = function (path) {

    if (!path) {
      throw new Error('Invalid argument');
    }

    this.path = path;
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
   * Generate datauri
   * @returns {Promise}
   */
  ImageEncoder.prototype.generateDataURI = function () {

    var width = this.width;
    var height = this.height;
    var path = this.path;

    return new Promise(function (resolve, reject) {

      var onLoad = function (e) {

        var canvas = document.createElement('canvas');
        canvas.width = width ? width : image.width;
        canvas.height = height ? height : image.height;

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

      var image = new Image();
      image.setAttribute('crossOrigin','anonymous');
      image.addEventListener('load', onLoad);
      image.addEventListener('error', onError);
      image.src = path;
    });
  };
  
  window.ImageEncoder = ImageEncoder;
  
})(window);