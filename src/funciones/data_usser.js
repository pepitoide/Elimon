const mongoose= require("mongoose");
const data_usser = require("../db/Modelos/data_ussers")
const puertas = require("./puertas")
const setDate = require("./set_date")
const embed = require("./embed");
const {Parser} = require('json2csv');
const fs = require("fs");

async function buscar(user_id, server_id) {
    const busqueda = await data_usser.findOne({user_id: `${user_id}`, server_id: `${server_id}`})
    return(busqueda)
}

async function buscar_id(mecion_id, server_id) {
    const busqueda_id = await data_usser.findOne({user_id: `${mecion_id}`, server_id: `${server_id}`})
    return(busqueda_id)
}

async function create_usser(user_id, server_id,usser_name, message) {
    const create_usser = new data_usser({user_id: `${user_id}`, server_id: `${server_id}`,usser_name: `${usser_name}`, date: `${setDate.setDate()}`})
    create_usser.save()
    return(message.channel.send({embeds: [embed.data_created]}))
}

async function update_data_usser(user_id, server_id,usser_name,fecha) {
    const update = await data_usser.updateOne({user_id: `${user_id}`, server_id: `${server_id}`}, {user_id: `${user_id}`, server_id: `${server_id}`,usser_name: `${usser_name}`, date: fecha})
    const leave = await puertas.clockout(user_id, server_id)
    return(update, leave)
}

async function data_all(server_id){
    const busqueda_data_all = await data_usser.find({server_id: `${server_id}`})
    return(busqueda_data_all)
}

async function delete_data_all(server_id, message){
    const delete_data_all_usser = await data_usser.deleteMany({server_id: `${server_id}`})
    if(delete_data_all_usser.acknowledged){
        message.channel.send({embeds:[embed.embed_exito]})
    }else return(message.channel.send({embeds:[embed.embed_warning]})) 
}

async function data_all_export(server_id, message){
    const busqueda_data_all_export = await data_usser.find({server_id: `${server_id}`})
    var information = [];
    
    busqueda_data_all_export.forEach(e=>{
        let day = e.date.toString().split(" ", 3).toString().slice(9) - 1;
        const info = {ID: `${e.user_id}`, Nombre: `${e.usser_name}`, Tiempo: `${e.date.getUTCHours()} Horas, ${e.date.getMinutes()} Minutos, ${e.date.getSeconds()} Segundos`};
        information.push(info)
    })
    
    const data_ext = new Parser()
    const csv = data_ext.parse(information)
    
    fs.writeFile(`information-temp-server-${server_id}.csv`, csv, e =>{
        if(e){
            throw e;
        }

        message.channel.send({ files: [`./information-temp-server-${server_id}.csv`] })

        let delete_data_temp =setTimeout(() => {
            delete_file(server_id).then(e => {
            if(e){
                clearTimeout(delete_data_temp)
            }
            })
        }, 0100);
    })

    return
}


async function delete_file(server_id){

    var estado = false;

    try{

        fs.unlinkSync(`information-temp-server-${server_id}.csv`)
        console.log('File removed')
        estado = true;

    }catch(err){

        console.error('Something wrong happened removing the file', err)
        estado = false;
    }

    return(estado)
}

exports.buscar = buscar;
exports.buscar_id = buscar_id;
exports.create_usser = create_usser;
exports.update_usser = update_data_usser;
exports.buscar_data_all = data_all;
exports.delete_data_all = delete_data_all;
exports.data_all_export = data_all_export;