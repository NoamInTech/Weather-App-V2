const Timezone = async (now) => {
  try {
    const userName = process.env.REACT_APP_TIMEZONE_API_USERNAME;
    const geonamesURL = `https://secure.geonames.org/searchJSON?q=${now}&maxRows=1&username=${userName}`;

    const locationResponse = await fetch(geonamesURL);
    const locationData = await locationResponse.json();

    const { lat, lng } = locationData.geonames[0];
    const timezoneURL = `https://secure.geonames.org/timezoneJSON?formatted=true&lat=${lat}&lng=${lng}&username=${userName}`;

    const timezoneResponse = await fetch(timezoneURL);
    const timezoneData = await timezoneResponse.json();

    const currentTime = timezoneData.time;
    console.log(currentTime);
    return currentTime;
  } catch (error) {
    console.error("Error:", error);
  }
};

export default Timezone;
