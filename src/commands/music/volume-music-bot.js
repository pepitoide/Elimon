const Discord = require("discord.js");
const embed = require("../../funciones/embed")

module.exports = {
    name: "volumen",
    alias: ["volume", "v"],

    async execute(client, message, args){

        const queue = client.distube.getQueue(message);
        const voice_channel = message.member.voice;
        const volumen = parseInt(args[0]);
        
        if(!voice_channel.channel)return(message.channel.send("Debes estar en un canal de voz"))
        if(!queue)return(message.channel.send("No hay cancion a la que subirle el volumen"))
        if(isNaN(volumen))return(message.channel.send("Debe ser un numero"))
        if(volumen >= 1 && volumen <= 100){
            try{
                const stop = await queue.setVolume(volumen)
                message.channel.send({embeds:[embed.embed_exito]})
            } catch (err) {
                console.log(err)
            }
        }else return(message.channel.send("Debe de ser un numero del 1 al 100"))
        
    }
}