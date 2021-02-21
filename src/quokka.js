import { map } from "lodash/fp";

class Test {}

let t = new Test();

let r = t instanceof Test;
r;

const greet = () => {
  return "hey";
};
const a = greet();

a;

const b = { 1: 2, 3: 4 };

const c = map((x) => x, b);

c;
