const a = require("../../src/Components/images/A.png");
const b = require("../../src/Components/images/B.png");
const c = require("../../src/Components/images/C.png");
const d = require("../../src/Components/images/D.png");
const e = require("../../src/Components/images/E.png");

const getNutriScore = nutriscore => {
  switch (nutriscore) {
    case "a":
      return a;
    case "b":
      return b;
    case "c":
      return c;
    case "d":
      return d;
    case "e":
      return e;
    default:
      return "";
  }
};

export default getNutriScore;
