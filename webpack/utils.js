const fs = require('fs');

/**
 * 添加全局混入的 Sass 变量或 mixin 等，而不需要显式地导入它们
 * @param {String Array} files 
 */
exports.getSassVariable = function(files = []) {
  if (typeof files === 'string') {
    files = [files];
  }
  return files.reduce((collection, iteratee) => {
    let str = fs.readFileSync(iteratee, 'utf8').trim();
    str = str.endsWith(';') ? str : str + ';';
    return collection + str;
  }, '');
};
