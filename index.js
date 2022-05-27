const usb = require('usb');
const Jimp = require('jimp');
const TscBuffer = require('./utils/TscBuffer')
const TscPrinter = require('./utils/TscPrinter')
const dateformat = require("dateformat")

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

const personData = {
    surname: "Ryan",
    forename: "Matt",
    sex: "m",
    dob: "1961-06-28",
    ref: "724-073-989"     
}

const now = new Date()
const dateStr = dateformat(now, "yyyy-mm-dd")
const timeStr = dateformat(now, "HH:MM:ss")

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
    TscBuffer.text(175, 30 + 15, font, 0, 1, 1, personData.surname?.toUpperCase() || '' ),


    TscBuffer.text(75, 30 + 34 + 15, font, 0, 1, 1, "FORENAME"),
    TscBuffer.text(175, 30 + 34 + 15, font, 0, 1, 1, personData.forename?.toUpperCase() || ''),


    TscBuffer.text(75, 30 + 34 + 34 + 15, font, 0, 1, 1, "SEX"),
    TscBuffer.text(140, 30 + 34 + 34 + 15, font, 0, 1, 1, personData.sex?.toUpperCase() || ''),


    TscBuffer.text(175, 30 + 34 + 34 + 15,font, 0, 1, 1, "DOB"),
    TscBuffer.text(240, 30 + 34 + 34 + 15,font, 0, 1, 1, personData.dob?.toUpperCase() || ''),


    TscBuffer.text(75, 30 + 34 + 34 + 34 + 15, font, 0, 1, 1, "DATE"),
    TscBuffer.text(115, 30 + 34 + 34 + 34 + 15, font, 0, 1, 1, dateStr.toUpperCase() || ''),


    TscBuffer.text(230, 30 + 34 + 34 + 34 + 15, font, 0, 1, 1, "TIME"),
    TscBuffer.text(280, 30 + 34 + 34 + 34 + 15, font, 0, 1, 1, timeStr.toUpperCase() || ''),


    TscBuffer.text(75, 30 + 34 + 34 + 34 + 34 + 15, font, 0, 1, 1, "REF"),
    TscBuffer.text(120, 30 + 34 + 34 + 34 + 34 + 15, font, 0, 1, 1, personData.ref?.toUpperCase() || ''),


    TscBuffer.text(40, 50, font, 90, 1, 1, "MEDICAL EXPRESS"),
    TscBuffer.text(20, 90, font, 90, 1, 1, "CLINIC"),


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

