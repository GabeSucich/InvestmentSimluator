var fs = require('fs')
const path = require('path');
const basename = path.basename(__filename);
const strategyFuncs = {}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const funcInfo = require(path.join(__dirname, file));
    
    strategyFuncs[funcInfo["name"]] = funcInfo["function"];
  });



module.exports = strategyFuncs