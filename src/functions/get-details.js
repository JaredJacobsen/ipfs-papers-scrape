import { MESSAGE_TYPES } from "../constants";
import sendMessage from "./utils/send-message";

export default async function getDetails() {
  return await sendMessage({ type: MESSAGE_TYPES.DETAILS });
}
