const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
const baseUrl = "https://api.shecodes.io/weather/v1/";

const getApiUrl = (path, params) => {
  // Example URL: https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric
  // params is an object, need to extract the keys and values and convert them into a query string

  let queryString = "";
  for (const [key, value] of Object.entries(params)) {
    queryString += `${key}=${value}&`;
  }

  return `${baseUrl}${path}?${queryString}key=${apiKey}&units=metric`;
};

export { getApiUrl };
