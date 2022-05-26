const usb = require('usb');
const Jimp = require('jimp');
const TscBuffer = require('./utils/TscBuffer')
const TscPrinter = require('./utils/TscPrinter')

const deviceList = usb.getDeviceList();
console.log(`Found ${deviceList.length} device list`);

const xPrinterDev = new TscPrinter(deviceList[0])

// const printImage = async () => {
//   const imgPath = '../assets/sample-image.jpg';
//   const img = await Jimp.read(imgPath);
//   const buffer = await TscBuffer.bitmap(0, 0, img.bitmap)
//   await xPrinterDev.Write(Buffer.concat([
//     TscBuffer.cls(),
//     buffer,
//     TscBuffer.print(1)
//   ]));
// }

const lineGap = 20
const font = "2"

const printText = async () => {
  let data = Buffer.concat([
    TscBuffer.sizeBymm(51, 25),
    TscBuffer.gapDetect(),
    TscBuffer.offSetBymm(5),

    TscBuffer.home(),
    TscBuffer.cls(),
    TscBuffer.box(100,20,200,70,5),

    // TscBuffer.text(10, 0, font, 0, 1, 1, "SURNAME"),
    // TscBuffer.text(10, lineGap, font, 0, 1, 1, "FORENAME"),
    // TscBuffer.text(10, 2 * lineGap, font, 0, 1, 1, "SEX"),
    // TscBuffer.text(100, 2 * lineGap, font, 0, 1, 1, "DATE OF  BIRTH"),
    // TscBuffer.text(10, 3 * lineGap, font, 0, 1, 1, "DATE"),
    // TscBuffer.text(100, 3 * lineGap, font, 0, 1, 1, "TIME"),
    // TscBuffer.text(10, 4 * lineGap, font, 0, 1, 1, "MEDICAL EXPRESS CLINIC"),


    TscBuffer.print(1),
  ])
  await xPrinterDev.Write(data)
}

// const printBarcode = () => {
//   [
//     TscBuffer.sizeBymm(60,30),
//     TscBuffer.gapBymm(0,0),
//     TscBuffer.cls(),
//     TscBuffer.barCode(60,50,"128",100,1,0,2,2,"Hello there"),
//     TscBuffer.print(1)
//   ].forEach(data => xPrinterDev.Write(data));
// }
// printBarcode()

// printImage()


printText()

