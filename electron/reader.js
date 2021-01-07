const readLastLines = require("read-last-lines");

module.exports = (path) => readLastLines.read(path, 42);
