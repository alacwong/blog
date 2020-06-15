const mongoose = require('mongoose');
let connection;

module.exports = {
    connect:   () => {
        const uri = process.env.ATLAS_URI;
        mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true,  useUnifiedTopology: true});

        connection = mongoose.connection;
        connection.once('open', () => {
            console.log("MongoDB database connection established successfully");
        });
    }, 

    getConnection: () => connection
}