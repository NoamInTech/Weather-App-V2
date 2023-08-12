const formatDate = (timeString) => {
  const date = new Date(timeString);
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  };
  return date.toLocaleString("en-US", options).replace(" at", ",").trim();
};

export { formatDate };
