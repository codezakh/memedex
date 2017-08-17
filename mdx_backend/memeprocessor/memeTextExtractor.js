const querystring = require('querystring');
const request = require('request');

const processMeme = (memeUrl) => {
  const subscriptionKey = '591bc9279a8349c18bbca8ce78a7bf7d';
  const uriBase = 'https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/ocr';
  const params = {
    language: 'en',
    detectOrientation: 'true',
  };
  const uri = `${uriBase}?${querystring.stringify(params)}`;
  const options = {
    headers: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': subscriptionKey,
    },
    body: JSON.stringify({
      url: memeUrl,
    }),
  };
  return new Promise((resolve, reject) => {
    request.post(uri, options, (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        resolve(body);
      }
    });
  });
};


const a = processMeme('https://i.redd.it/dz0qua4kcbgz.png');
a.then(response => console.log(response))

