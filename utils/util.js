


function getData(url){
  return new Promise(function(resolve, reject){
    wx.request({
      url: url,
      data: {},
      header: {
        //'Content-Type': 'application/json'
      },
      success: function(res) {
        console.log("success")
        resolve(res)
      },
      fail: function (res) {
        reject(res)
        console.log("failed")
      }
    })
  })
}

function getData2(){
  return index.index;
}

function getNext(){
  return index_next.next;
}

function getDiscovery(){
  return discovery.discovery;
}

function discoveryNext(){
  return discovery_next.next;
}


module.exports.getData = getData;
module.exports.getData2 = getData2;
module.exports.getNext = getNext;
module.exports.getDiscovery = getDiscovery;
module.exports.discoveryNext = discoveryNext;


const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatTimeAsId = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('') + [hour, minute, second].map(formatNumber).join('')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// Return a Date(with typeof string to avoid issue to display time) with a readable format (yyyy-MM-dd).
const standardDate = function (date) {
  date = new Date(date);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return [year, month, day].map(formatNumber).join('-');
}

//y: year; M: month; D: days; H: hour; m: minutes; s: seconds;
const formatDate = function (date, format) {
  const weekDaysCN = ['日', '一', '二', '三', '四', '五', '六']

  date = new Date(date);
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const weekday = date.getDay();

  return format.replace("y", formatNumber(year)).
    replace("M", formatNumber(month)).
    replace("D", formatNumber(day)).
    replace("H", hour).
    replace("m", minutes).
    replace("s", seconds).
    replace("w", weekDaysCN[weekday]);
}

const diffDays = function (dateBegin, dateEnd) {
  var dateBegin = new Date(dateBegin);
  var dateEnd = new Date(dateEnd);

  // Remove time of date
  var dateBegin = new Date(dateBegin.getFullYear(), dateBegin.getMonth(), dateBegin.getDate());
  var dateEnd = new Date(dateEnd.getFullYear(), dateEnd.getMonth(), dateEnd.getDate());

  // Calculate the difference in milliseconds
  var difference_ms = dateEnd.getTime() - dateBegin.getTime();

  // The number of milliseconds in one day
  var ONE_DAY_MS = 1000 * 60 * 60 * 24;

  // Convert back to days and return
  return Math.round(difference_ms / ONE_DAY_MS);
}

const addDays = function (date, days) {
  var newDate = new Date(date); // Create a new instance to broke the reference to date passed in.
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}


const flatObject = function (obj) {
  var clone = {};
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      clone[prop] = obj[prop];
    }
  }
  return clone;
}

module.exports = {
  formatTime: formatTime,
  formatTimeAsId: formatTimeAsId,
  formatDate: formatDate,
  diffDays: diffDays,
  addDays: addDays,
  flatObject,
  standardDate,
}