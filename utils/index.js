export const shortText = (text, n) => {
  return text.length > n ? text.slice(0, n) + "..." : text;
};

export const dateIsoToYearMonthDate = (date) => {
  const now = new Date(date);
  const year = now.getFullYear();
  let month = now.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  let day = now.getDate();
  if (day < 10) {
    day = "0" + day;
  }
  return `${year}-${month}-${day}`;
};
