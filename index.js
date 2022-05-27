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
const font = "1"

const printText = async () => {
  let data = Buffer.concat([
    TscBuffer.sizeBymm(51, 25),
    TscBuffer.gapDetect(),
    TscBuffer.offSetBymm(5),

    TscBuffer.home(),
    TscBuffer.cls(),
    TscBuffer.box(70,30,370,200,1,20),
    TscBuffer.box(70,30,370,30 + 34 ,1,20),
    TscBuffer.box(70,30 + 34 ,370,30 + 34 + 34 ,1,20),
    TscBuffer.box(70,30 + 34 + 34 ,170,30 + 34 + 34 + 34 ,1,20),
    TscBuffer.box(170,30 + 34 + 34 ,370,30 + 34 + 34 + 34 ,1,20),
    TscBuffer.box(70,30 + 34 + 34 + 34 ,70 + 150 ,30 + 34 + 34 + 34 + 34 ,1,20),
    TscBuffer.box(70 + 150,30 + 34 + 34 + 34 , 370 ,30 + 34 + 34 + 34 + 34 ,1,20),


    TscBuffer.text(75, 30 + 15, font, 0, 1, 1, "SURNAME"),
    TscBuffer.text(75, 30 + 34 + 15, font, 0, 1, 1, "FORENAME"),
    TscBuffer.text(75, 30 + 34 + 34 + 15, font, 0, 1, 1, "SEX"),
    TscBuffer.text(175, 30 + 34 + 34 + 15, 0, 1, 1, "DOB"),
    TscBuffer.text(75, 30 + 34 + 34 + 34 + 15, font, 0, 1, 1, "DATE"),
    TscBuffer.text(200, 30 + 34 + 34 + 34 + 15, font, 0, 1, 1, "TIME"),
    TscBuffer.text(75, 30 + 34 + 34 + 34 + 34 + 15, font, 0, 1, 1, "MEDICAL EXPRESS CLINIC"),


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

