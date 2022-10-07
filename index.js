const { degrees, PDFDocument, rgb, StandardFonts }=require('pdf-lib');

// This should be a Uint8Array or ArrayBuffer
// This data can be obtained in a number of different ways
// If your running in a Node environment, you could use fs.readFile()
// In the browser, you could make a fetch() call and use res.arrayBuffer()
const fs=require("fs");

async function main(footer,bg){

fs.readFile(`./pdfs/1.pdf`,async function(err, data){


const pdfDoc = await PDFDocument.load(data)
const [footerPdf] = await pdfDoc.embedPdf(footer);
const pngImage=await pdfDoc.embedPng(bg);


const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)


const pages = pdfDoc.getPages();
const lastPage = pages[pages.length-1]


const { width, height } = lastPage.getSize()

const footerDims = footerPdf.scale(0.3)
const pngDims = pngImage.scale(0.5);

lastPage.drawImage(pngImage, {
    x: 0,
    y: lastPage.getHeight() - 850,
    width: width,
    height: pngDims.height,
  })
  
lastPage.drawPage(footerPdf, {
    x: 0,
    y: lastPage.getHeight() - 850
  })


const pdfBytes = await pdfDoc.save();
fs.writeFileSync('./1.pdf', pdfBytes);


});

}

fs.readFile("./footer.pdf",(err,data)=>{
    fs.readFile("./bck.png",(err,bg)=>{
        main(data,bg);
    });
})



