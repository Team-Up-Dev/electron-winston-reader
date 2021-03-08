module.exports = (string) => 
  string.split("\n")
  .filter((d) => d !== "")
  .map(JSON.parse)
  .map((d) => ({ ...d, message: d.message.replace('"\n', "") }));
