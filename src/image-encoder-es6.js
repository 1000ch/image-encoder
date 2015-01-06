export class ImageEncoder { 

  constructor(path = '', width = 1, height = 1) {  
    this.path = path;
    this.width = width;
    this.height = height; 
  }

  setPath(path = '') { 
    this.path = path; 
  }  

  setSize(width = 1, height = 1) {
    this.width = width; 
    this.height = height;
  }

  getDataURI() { 
    return new Promise((resolve, reject) => {  

      let image = new Image(); 
      image.setAttribute('crossOrigin','anonymous');  

      let onLoad = (e) => {  

        let canvas = document.createElement('canvas');
        canvas.width = this.width ? this.width : image.width;
        canvas.height = this.height ? this.height : image.height;  
        canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);

        image.removeEventListener('load', onLoad);
        image.removeEventListener('error', onError);  

        resolve(canvas.toDataURL('image/png', 1)); 
      };

      let onError = (e) => {  

        image.removeEventListener('load', onLoad);
        image.removeEventListener('error', onError);

        reject(e);
      };  

      image.addEventListener('load', onLoad); 
      image.addEventListener('error', onError); 
      image.src = this.path; 
    }); 
  } 
}
