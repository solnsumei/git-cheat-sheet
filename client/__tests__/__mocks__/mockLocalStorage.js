export default {
  setItem(key, value) {
    window.localStorage.setItem(key, value);
  },
  getItem(key) {
    window.localStorage.getItem(key);
  },
  removeItem(key) {
    window.localStorage.removeItem(key);
  },
  clear() {
    window.localStorage.clear();
  }
};
