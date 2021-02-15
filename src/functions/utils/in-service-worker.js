export default function inServiceWorker() {
  return typeof document === "undefined";
}
