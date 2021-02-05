//This code was copied from https://github.com/kevva/is-pdf/blob/master/index.js

export default function isPdf(buf) {
  if (!buf || buf.length < 4) {
    return false;
  }

  return (
    buf[0] === 0x25 && buf[1] === 0x50 && buf[2] === 0x44 && buf[3] === 0x46
  );
}
