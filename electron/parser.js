module.exports = (string) => {
  const split = string.split("\n");
  const all = split
    .map((data, id) => (id + 1 < split.length ? data.replace("}", "},") : data))
    .join("");

  return JSON.parse("[" + all + "]");
};
