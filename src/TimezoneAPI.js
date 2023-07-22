export default async function GetCurrentTime(mongroscul) {
  const userName = "camille_loue";
  const geonamesURL = `http://api.geonames.org/searchJSON?q=${mongroscul}&maxRows=1&username=${userName}`;

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
      return currentTime;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
