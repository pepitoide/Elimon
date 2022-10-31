const Discord = require("discord.js")
const puertas = require("../../funciones/puertas")
const data_usser = require("../../funciones/data_usser")
const embed = require("../../funciones/embed")
require("../../db/db.js")


module.exports = {
    name: "clockout",
    alias: ["salida"],

    async execute(client, message, args){
        const user_id = message.author.id;
        const server_id = message.guild.id;
        const usser_name = message.author.username;
        const clocked = await puertas.buscar(user_id, server_id)
        const buscar_data= await data_usser.buscar(user_id, server_id) 

        if(!clocked)return(message.channel.send({embeds:[embed.debes_fichar]}));
        if(clocked && !buscar_data)return(message.channel.send({embeds: [embed.no_data_creada_v]}));
        if(clocked){
            let hora_entrada = new Date(clocked.date);
            let hora_salida = new Date();
            let hora_transcurrida =  hora_salida.getTime() - hora_entrada.getTime();
            let hora_transcurrida_r = new Date(hora_transcurrida);
            let fecha_ = buscar_data.date.getTime() + hora_transcurrida_r.getTime();
            let fecha = new Date(fecha_)
            
            data_usser.update_usser(user_id, server_id,usser_name, fecha).then(e =>{
                if(e.acknowledged){message.channel.send({embeds: [embed.embed_salida]})}else return(message.channel.send({embeds: [embed.embed_warning]}))
            })
        }
    }
}