const functions = require('firebase-functions');
const vision = require('@google-cloud/vision')();
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.saveNonOffensiveImages = functions.storage.object().onChange(event => {
  const object = event.data;
  // Exit if this is a deletion or a deploy event.
  if (object.resourceState === 'not_exists') {
    return console.log('This is a deletion event.');
  } else if (!object.name) {
    return console.log('This is a deploy event.');
  }

  if (object.resourceState === 'exists' && object.metageneration > 1) {
    console.log('This is a metadata change event.');
    return;
  }

  const file = admin
    .storage()
    .bucket(object.bucket)
    .file(object.name);

  const image = {
    source: { imageUri: `gs://${object.bucket}/${object.name}` }
  };

  // Check the image content using the Cloud Vision API.
  return vision.safeSearchDetection(image).then(batchAnnotateImagesResponse => {
    const safeSearchResult =
      batchAnnotateImagesResponse[0].safeSearchAnnotation;
    if (
      safeSearchResult.adult === 'LIKELY' ||
      safeSearchResult.adult === 'VERY_LIKELY' ||
      safeSearchResult.violence === 'LIKELY' ||
      safeSearchResult.violence === 'VERY_LIKELY'
    ) {
      console.log(
        `The image ${object.name} has been detected as inappropriate.`
      );
    } else {
      return file.makePublic().then(() => {
        const url = `https://storage.googleapis.com/${object.bucket}/${object.name}`;

        console.log('saving', url);

        return admin
          .firestore()
          .collection('images')
          .add({
            url
          });
      });
    }
  });
});
