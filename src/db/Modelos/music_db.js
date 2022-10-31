const mongoose = require("mongoose")

const music = new mongoose.Schema({
    server_id: {type: String},
    user_id: {type: String},
    songs: {type: Array},
})

module.exports = mongoose.model("music", music)