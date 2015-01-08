# image-encoder

## About

Encode image into DataURI.

## Install

Install via bower.

```bash
$ bower install 1000ch/image-encoder
```

## Usage

```javascript
var ie = new ImageEncoder('path/to/image.png');
ie.getDataURI().then(function onFulfilled(datauri) {
  console.log(datauri);
}, function onRejected (error) {
  console.log(error);
});
```

## License

MIT: http://1000ch.mit-license.org
