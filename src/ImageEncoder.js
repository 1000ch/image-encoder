(function(window) {
  
  function ImageEncoder(path) {
    this.file = path ? path : "";
    this.canvas = document.createElement('canvas');
    this.image = null;
    this.width = null;
    this.height = null;
  }
  
  ImageEncoder.prototype.setPath = function(path) {
    this.file = path;
  };
  
  ImageEncoder.prototype.setSize = function(width, height) {
    this.width = width;
    this.height = height;
  };

  ImageEncoder.prototype.dispose = function() {
    this.canvas = null;
    this.image = null;
  };
  
  ImageEncoder.prototype.getDataURI = function(callback) {
    var that = this;
    this.image = new Image();
    this.image.onload = function() {
      that.canvas.width = that.image.width;
      that.canvas.height = that.image.height;
      if(that.width) {
        that.canvas.width = that.width;
      }
      if(that.height) {
        that.canvas.height = that.height;
      }
      var context = that.canvas.getContext("2d");
      context.drawImage(that.image, 0, 0, that.canvas.width, that.canvas.height);
      callback(that.canvas.toDataURL("image/png", 1));
    };
    this.image.src = this.file;
  };
  
  window.ImageEncoder = ImageEncoder;
  
})(window);