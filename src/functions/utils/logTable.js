export default function logTable(v, title, collapsed = true) {
  if (title) {
    if (collapsed) console.groupCollapsed(title);
    else console.group(title);
  }
  console.table(v);
  title && console.groupEnd();
}
