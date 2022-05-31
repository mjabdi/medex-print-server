const { BloodBooking } = require("./models/BloodBooking")
const { STDBooking } = require("./models/STDBooking")
const { ScreeningBooking } = require("./models/ScreeningBooking")


const { printText } = require("./printManager")


function convertDate(str) {

    if (!str || str.length != 10) {
        return ""
    }

    return `${str.substr(8, 2)}-${str.substr(5, 2)}-${str.substr(0, 4)}`
}

const checkForPrint = async () => {
    await checkForPrintBlood()
    await checkForPrintSTD()
    await checkForPrintScreening()
}


const checkForPrintBlood = async () => {

    const bloodBooking = await BloodBooking.findOne({ printStatus: "preparing" })
    await printBooking(bloodBooking)
}

const checkForPrintSTD = async () => {

    const stdBooking = await STDBooking.findOne({ printStatus: "preparing" })
    await printBooking(stdBooking)
}

const checkForPrintScreening = async () => {

    const scrBooking = await ScreeningBooking.findOne({ printStatus: "preparing" })
    await printBooking(scrBooking)
}



const printBooking = async (booking) => {
    if (booking) {
        console.log(`new print has been received : ${booking.fullname}`)
        booking.printStatus = 'printing'
        await booking.save()
        try {
            const personData = {
                forename: booking.fullname?.trim().split(' ').slice(0, -1).join(' '),
                surname: booking.fullname?.trim().split(' ').slice(-1).join(' '),
                dob: convertDate(booking.birthDate),
                ref: booking.bookingRef,
                sex: booking.gender || ''
            }
            await printLabel(personData)
            booking.printStatus = "printed"
            await booking.save()
        } catch (err) {
            console.log(err)
            booking.printStatus = ''
            await booking.save()
        }
    }
}

const printLabel = async (personData) => {
    console.log(personData)
    await printText(personData)
}

module.exports = {
    checkForPrint: checkForPrint
}