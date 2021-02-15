export default function isHtmlDisplayingPdf(html) {
  return (
    html.contains("application/x-google-chrome-pdf") ||
    html.contains(`<base href="resource://pdf.js/web/">`)
  );
}
