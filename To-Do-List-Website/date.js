//date.js module to get date

exports.getDate = function getDate() { //export this   no getDate()
  const today = new Date();
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  return today.toLocaleDateString("en-US", options);
}

exports.getDay = function getDay() { //to export getDay function
  const today = new Date();
  const options = {
    weekday: "long",
  };
  return today.toLocaleDateString("en-US", options);
}
