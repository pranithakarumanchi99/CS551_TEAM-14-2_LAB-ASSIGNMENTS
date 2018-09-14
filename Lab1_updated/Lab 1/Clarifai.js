// instantiate a new Clarifai app passing in your api key.
const app = new Clarifai.App({
    apiKey: 'YOUR_API_KEY'
});

// predict the contents of an image by passing in a url
app.models.predict(Clarifai.GENERAL_MODEL, 'https://samples.clarifai.com/metro-north.jpg').then(
    function(response) {
        console.log(response);
    },
    function(err) {
        console.error(err);
    }
);