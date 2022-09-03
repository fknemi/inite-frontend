const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const getTimestampDateTime = (
  timestamp: string,
  timeFormat: boolean = false
) => {
  let date = new Date(parseInt(timestamp));
  let hours = date.getHours() - (timeFormat ? 12 : 0);
  return `${
    timeFormat
      ? hours < 10
        ? hours === 0
          ? 12
          : "0" + hours
        : hours
      : hours < 10
      ? "0" + hours
      : hours
  }:${date.getMinutes()}:${date.getSeconds()} ${date.getDay()} ${
    monthNames[date.getMonth()]
  } ${date.getFullYear()}`;
};
