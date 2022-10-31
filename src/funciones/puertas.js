const mongoose= require("mongoose");
const puertas = require("../db/Modelos/puertas")
const embed = require("./embed")
require("../db/db.js")

async function buscar(user_id, server_id) {
    const busqueda = await puertas.findOne({user_id: `${user_id}`,server_id: `${server_id}`})
    return(busqueda)
}

async function clockin(user_id, server_id, usser_name, message) {
    const clockin = new puertas({user_id: `${user_id}`,server_id: `${server_id}`, usser_name: `${usser_name}`})
    clockin.save()
    return(message.channel.send({embeds:[embed.embed_entrada]}))
}

async function clockedin(server_id) {
    const busqueda_clockedin = await puertas.find({server_id: `${server_id}`})
    return(busqueda_clockedin)
}

async function clockout(user_id, server_id){
    const delete_clockin = await puertas.deleteOne({user_id: `${user_id}`, server_id: `${server_id}`})
    return(delete_clockin)
}


exports.buscar = buscar;
exports.clockin = clockin;
exports.clockedin = clockedin;
exports.clockout = clockout;