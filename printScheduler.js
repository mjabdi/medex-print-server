const { BloodBooking } = require("./models/BloodBooking")
const { printText } = require("./printManager")


const checkForPrint = async () => {

    const bloodBooking = await BloodBooking.findOne({ printStatus: "preparing" })
    if (bloodBooking) {
        console.log(`new print has been received : ${bloodBooking.fullname}`)
        bloodBooking.printStatus = 'printing'
        await bloodBooking.save()

        try {

            const personData = {
                forename: bloodBooking.fullname.trim().split(' ').slice(0, -1).join(' '),
                surname: bloodBooking.fullname.trim().split(' ').slice(-1).join(' '),
                dob: bloodBooking.birthDate,
                ref: bloodBooking.bookingRef,
            }

            await printLabel(personData)

            bloodBooking.printStatus = "printed"
            await bloodBooking.save()

        } catch (err) {
            console.log(err)
            bloodBooking.printStatus = ''
            await bloodBooking.save()
        }
    }
}

const printLabel = async (personData) =>
{
    console.log(personData)
    await printText(personData)
}

module.exports = {
    checkForPrint: checkForPrint
}