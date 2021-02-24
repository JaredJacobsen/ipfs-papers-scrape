export default function log(v, title) {
  title && console.group(title);
  console.log(v);
  title && console.groupEnd();
}
