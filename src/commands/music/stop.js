const Discord = require("discord.js")
const embed = require("../../funciones/embed")

module.exports = {
    name: "stop",
    alias: ["parar"],

    async execute(client, message, args){

        const queue = client.distube.getQueue(message);
        const voice_channel = message.member.voice;
        const cancion = args.join(" ");

        if(!voice_channel.channel)return(message.channel.send("Debes estar en un canal de voz"))
        if(!queue)return(message.channel.send("No hay cancion que parar"))

        try{
            const stop = await queue.stop()
            message.channel.send({embeds:[embed.embed_exito]})
        } catch (err) {
            console.log(err)
        }
    }
}