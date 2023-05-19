const moment = require('moment');




function GetTimeAgo(timestamp) {
  const now = moment();
  const diffSeconds = now.diff(moment(timestamp), 'seconds');
  if (diffSeconds < 60) {
    return 'just now';
  } else if (diffSeconds < 3600) {
    const diffMinutes = Math.floor(diffSeconds / 60);
    return diffMinutes + (diffMinutes > 1 ? ' mins ago' : ' min ago');
  } else if (now.isSame(moment(timestamp), 'day')) {
    return moment(timestamp).format('LT');
  } else if (now.isSame(moment(timestamp), 'week')) {
    return moment(timestamp).format('ddd LT');
  } else {
    return moment(timestamp).format('DD MMM LT');
  }
}

export default GetTimeAgo