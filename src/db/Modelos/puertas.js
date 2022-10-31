const mongoose = require("mongoose");

const puerta = new  mongoose.Schema(
    {
        user_id: {type: String},
        server_id: {type: String},
        usser_name: {type: String},
        date: {type: Date, default: Date.now}

    }
)

module.exports = mongoose.model(`puerta`, puerta)