module.exports = {
  hasProperty(obj, propName) {
    return Object.prototype.hasOwnProperty.call(obj, propName);
  }
};
