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
  return `${hours < 10 ? "0" + hours : hours}:${
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
  }:${date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()} ${
    date.getDay() < 10 ? "0" + date.getDay() : date.getDay()
  } ${monthNames[date.getMonth()]} ${date.getFullYear()}
        `;
};

export const parseJSON = (item: string) => {
  try {
    return JSON.parse(item);
  } catch {
    return null;
  }
};
