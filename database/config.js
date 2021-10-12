const mongoose = require('mongoose');

const url = process.env.MONGODB_TEST;

const dbConnection = async () => {

    try {

        await mongoose.connect(url);

        console.log('Ready db')
        
    } catch (error) {

        console.log(error);

        throw new Error('Failed to connect db');
        
    }

}

module.exports = dbConnection;