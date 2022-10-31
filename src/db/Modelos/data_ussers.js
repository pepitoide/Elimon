const mongoose = require("mongoose")


const data_ussers = new mongoose.Schema({
    user_id:{type: String},
    server_id:{type: String},
    usser_name:{type: String},
    date:{type: Date}
})

module.exports = mongoose.model("data_ussers", data_ussers)