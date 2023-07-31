export default async function Timezone(now) {
  const userName = process.env.REACT_APP_TIMEZONE_API_USERNAME;
  const geonamesURL = `http://api.geonames.org/searchJSON?q=${now}&maxRows=1&username=${userName}`;

  return fetch(geonamesURL)
    .then((response) => response.json())
    .then((data) => {
      const { lat, lng } = data.geonames[0];
      const timezoneURL = `http://api.geonames.org/timezoneJSON?formatted=true&lat=${lat}&lng=${lng}&username=${userName}`;

      return fetch(timezoneURL);
    })
    .then((response) => response.json())
    .then((data) => {
      const currentTime = data.time;
      console.log(data.time);
      return currentTime;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
