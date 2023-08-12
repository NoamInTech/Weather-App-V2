const maxTemperature = () => {
  let temperature = Math.round(props.data.temperature.maximum);
  return `${temperature}°`;
};

const minTemperature = () => {
  let temperature = Math.round(props.data.temperature.minimum);
  return `${temperature}°`;
};

export { maxTemperature, minTemperature };
