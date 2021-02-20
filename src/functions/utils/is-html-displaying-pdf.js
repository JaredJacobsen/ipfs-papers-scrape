export default function isHtmlDisplayingPdf(html) {
  return (
    html.includes("application/x-google-chrome-pdf") ||
    html.includes(`<base href="resource://pdf.js/web/">`)
  );
}
