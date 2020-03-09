'use strict';

module.exports = async function (from, to, options) {
  await this.copy(from, to, options);
  this.delete(from, options);
};
