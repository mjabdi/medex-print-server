const config = require('config');
const mongodb = require('./mongodb');
const { checkForPrint } = require('./printScheduler');


async function run() {

    await mongodb()

    console.log("medex print server has been started.")

    const interval = setInterval( async () => {

        console.log("cheking for new print......")
        await checkForPrint()
        
    }, 10000);
}


run()