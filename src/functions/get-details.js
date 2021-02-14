import { MESSAGE_TYPES } from "../constants";
import sendMessage from "./utils/send-message";

export default function getDetails() {
  return sendMessage({ type: MESSAGE_TYPES.DETAILS });
}
