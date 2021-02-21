import { map } from "lodash/fp";

const greet = () => {
  return "hey";
};
const a = greet();

a;

const b = { 1: 2, 3: 4 };

const c = map((x) => x, b);

c;
