module.exports = {
  hasOwnProp(obj, propName) {
    return Object.prototype.hasOwnProperty.call(obj, propName);
  }
};
