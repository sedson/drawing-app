const units = [
  {unit: 1, label: 'second'},
  {unit: 60, label: 'minute'},
  {unit: (60 * 60), label: 'hour'},
  {unit: (60 * 60 * 24), label: 'day'},
  {unit: (60 * 60 * 24 * 7), label: 'week'},
  {unit: (60 * 60 * 24 * 7 * 4), label: 'month'},
];



const timeSince = (timeThen) => {
  const timeNow = Date.now();
  const seconds = (timeNow - timeThen) / 1000;

  for (let i = 1; i < units.length; i++) {
    if (seconds / units[i].unit < 1) {
      let unitsSince = Math.floor( seconds / units[i - 1].unit);
      let label = units[i - 1].label + ((unitsSince > 1) ? 's' : '');
      return `${unitsSince} ${label} ago`
    }
  }
}

module.exports = timeSince;
