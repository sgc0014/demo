export function calculatePositionFromElement(element) {
  // Calc position data
  let htmlElement = element;
  let top = 0;
  let left = 0;
  do {
    top += htmlElement ? htmlElement.offsetTop : 0;
    left += htmlElement ? htmlElement.offsetLeft : 0;
    htmlElement = htmlElement ? htmlElement.offsetParent : null;
  } while (htmlElement);
  return {
    x: left,
    y: top,
  };
}

export function scrollToPricing(smooth = true) {
  const elem = document.getElementById('pricing-blog');
  const pos = calculatePositionFromElement(elem);
  const newTop = pos.y < 48 ? 0 : pos.y - 48;
  window.scrollTo({ top: newTop, behavior: smooth ? 'smooth' : 'auto' });
}

export function scrollToFeatures(smooth = true) {
  const elem = document.getElementById('features-blog');
  const pos = calculatePositionFromElement(elem);
  const newTop = pos.y < 100 ? 0 : pos.y - 100;
  window.scrollTo({ top: newTop, behavior: smooth ? 'smooth' : 'auto' });
}

export function scrollToBanner(smooth = true) {
  const elem = document.getElementById('banner-blog');
  const pos = calculatePositionFromElement(elem);
  const newTop = pos.y < 48 ? 0 : pos.y - 48;
  window.scrollTo({ top: newTop, behavior: smooth ? 'smooth' : 'auto' });
}

export function scrollToMainTop(smooth = true) {
  const elem = document.getElementById('main-content-area');
  const pos = calculatePositionFromElement(elem);
  const newTop = pos.y < 48 ? 0 : pos.y - 48;
  window.scrollTo({ top: newTop, behavior: smooth ? 'smooth' : 'auto' });
}

export const formatDateTime = (stringDate:any) => {
  const mydate = new Date(parseFloat(stringDate));
  // let hours = mydate.getHours();
  // let minutes = mydate.getMinutes();
  // const ampm = hours >= 12 ? 'pm' : 'am';
  // hours %= 12;
  // hours = hours || 12; // the hour '0' should be '12'
  // minutes = minutes < 10 ? `0${minutes}` : minutes;
  // const strTime = `${hours}:${minutes} ${ampm}`;
  return `${mydate.toUTCString().substring(0, 16)}`;
};

export const formatDateTimeMilliseconds = (stringDate:any) => {
  const mydate = new Date(stringDate * 1000);
  return `${mydate.toUTCString().substring(0, 16)}`;
};

export const formatDateTimeHourMilliseconds = (stringDate:any) => {
  const mydate = new Date(stringDate * 1000);
  return `${mydate.toUTCString().substring(0, 22)}`;
};

export const formatDate = (date) => {
  let result = new Date(date);
  if (result.toString() === 'Invalid Date') {
    result = new Date();
  }
  return result.toUTCString().substring(0, 22);
};

export const dateTimestamp = (date) => {
  const timestamp = Date.parse(date);
  return Math.round(timestamp);
};

export const cisionDateFormat = (datestr) => {
  let result;
  if (datestr) {
    const y = datestr.substring(0, 4);
    const m = datestr.substring(4, 6);
    const d = datestr.substring(6, 8);
    const h = datestr.substring(9, 11);
    const mn = datestr.substring(11, 13);
    const s = datestr.substring(13, 15);
    const dd = y + "-" + m + "-" + d + "T" + h + ":" + mn + ":" + s + ".0000";
    result = new Date(dd);
    if (result.toString() === 'Invalid Date') {
      result = new Date();
    }
  }
  return result.toUTCString().substring(0, 22);
};

export const decimal2digit = (value) => {
  return parseFloat(value).toFixed(2);
};

export const arrayUnique = (array) => {
  const a = array.concat();
  for (let i = 0; i < a.length; ++i) {
    for (let j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j]) {
        a.splice(j--, 1);
      }
    }
  }
  return a;
};

export const addComma = (number) => {
  const parts = number.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};
