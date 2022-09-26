# Haversine Wizard - Browser App written in React

This React app takes two locations that will take inputs either directly from your browser's geolocation or from addresses provided by the user.  The addresses are converted to coordinates by using the geocoding API from geocod.io.

Note that you need an account and API key on geocod.io in order to make API calls from this app.  You must make a text file called .env and store the API key in it by putting the following line in the file:

REACT_APP_API_KEY='yourapikey'

Replace yourapikey with your geocod.io API key.

This app requires permission to access your device location via your browser if you would like to use your current location. If you do not want to give location permission or your device cannot return a location, a button is provided to simulate a successful location call. The simulated location is Demens Landing Park in downtown St. Petersburg.

After pulling the code to your local machine, run `npm install` to install the necessary packages.

It is important to note that the form to query the API is not coded as a form. The main reason is that I have not been able to integrate custom behavior in elements within the form and RTK Query without unintended behavior in response to user action. Therefore the enter key will not trigger the button in this app like it otherwise would in most forms.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.