export default function isPdfResponse(response) {
  const clone = response.clone()
  const buf = await clone.arrayBuffer();
  if (!buf || buf.length < 4) {
    return false;
  }

  return (
    buf[0] === 0x25 && buf[1] === 0x50 && buf[2] === 0x44 && buf[3] === 0x46
  );
}
