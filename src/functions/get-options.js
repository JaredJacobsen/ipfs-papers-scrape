import { MESSAGE_TYPES } from "../constants";
import sendMessage from "./utils/send-message";

export default async function getOptions() {
  return await sendMessage({ type: MESSAGE_TYPES.OPTIONS });
}
