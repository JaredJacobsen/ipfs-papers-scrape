export default function log(v, title) {
  title && console.group(title);
  log(v);
  title && console.groupEnd();
}
