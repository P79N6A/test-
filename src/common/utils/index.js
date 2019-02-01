const utils = {
  getParamsFromUrl() {
    const query = window.location.search.substring(1);
    const vars = query.split('&');
    const queryString = {};
    for (let i = 0; i < vars.length; i ++) {
      const pair = vars[i].split('=');
      const key = decodeURIComponent(pair[0]);
      const value = decodeURIComponent(pair[1]);
      if (key) {
        queryString[key] = decodeURIComponent(value);
      }
    }
    return queryString;
  },

  formattedDate(date) {
    return typeof date === 'number' ? new Date(date).toISOString().slice(0, 19).replace('T', ' ') : date;
  },
};
export default utils;
