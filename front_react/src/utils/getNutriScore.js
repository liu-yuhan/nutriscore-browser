const a = "/images/A.png";
const b = "/images/B.png";
const c = "/images/C.png";
const d = "/images/D.png";
const e = "/images/E.png";
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
