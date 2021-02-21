import log from "./log";

export default async function attempt(func, errorMessage) {
  try {
    return await func();
  } catch (error) {
    errorMessage && log(errorMessage);
    log(error);
  }
}
