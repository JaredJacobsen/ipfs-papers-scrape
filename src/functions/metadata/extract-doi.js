export default function extractDoi(text) {
  const re = /(10\.\d{4,9}\/[-._;():A-Z0-9]+)\s?/gi;
  const match = re.exec(text);
  return match && match[1];
}
