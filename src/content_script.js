// import * as pdfjsLib from "pdfjs-dist";
// import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

// // const pdfjs = await import('pdfjs-dist/build/pdf');
// //   const pdfjsWorker = await import('pdfjs-dist/build/pdf.worker.entry');

// const bkg = chrome.extension.getBackgroundPage();
// bkg.console.log("pdfjs");

// pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

// const pdfPath = "https://arxiv.org/pdf/1612.09596.pdf";

// const loadingTask = pdfjsLib.getDocument(pdfPath);
// loadingTask.promise
//   .then(function (doc) {
//     var numPages = doc.numPages;
//     console.log("# Document Loaded");
//     console.log("Number of Pages: " + numPages);
//     console.log();

//     var lastPromise; // will be used to chain promises
//     lastPromise = doc.getMetadata().then(function (data) {
//       console.log("# Metadata Is Loaded");
//       console.log("## Info");
//       console.log(JSON.stringify(data.info, null, 2));
//       console.log();
//       if (data.metadata) {
//         console.log("## Metadata");
//         console.log(JSON.stringify(data.metadata.getAll(), null, 2));
//         console.log();
//       }
//     });

//     var loadPage = function (pageNum) {
//       return doc.getPage(pageNum).then(function (page) {
//         console.log("# Page " + pageNum);
//         var viewport = page.getViewport({ scale: 1.0 });
//         console.log("Size: " + viewport.width + "x" + viewport.height);
//         console.log();
//         return page
//           .getTextContent()
//           .then(function (content) {
//             // Content contains lots of information about the text layout and
//             // styles, but we need only strings at the moment
//             var strings = content.items.map(function (item) {
//               return item.str;
//             });
//             console.log("## Text Content");
//             console.log(strings.join(" "));
//           })
//           .then(function () {
//             console.log();
//           });
//       });
//     };
//     // Loading of the first page will wait on metadata and subsequent loadings
//     // will wait on the previous pages.
//     for (var i = 1; i <= 1; i++) {
//       lastPromise = lastPromise.then(loadPage.bind(null, i));
//     }
//     return lastPromise;
//   })
//   .then(
//     function () {
//       console.log("# End of Document");
//     },
//     function (err) {
//       console.error("Error: " + err);
//     }
//   );
