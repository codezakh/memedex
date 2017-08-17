const querystring = require('querystring');
const request = require('request');

const processMeme = (memeUrl) => {
  const subscriptionKey = 'process.env.COGNITION_API_KEY';
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

