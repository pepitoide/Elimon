const Discord = require("discord.js")
const embed = require("../../funciones/embed")

module.exports = {
    name: "skip",
    alias: ["skipear", "saltar"],

    async execute(client, message, args){

        const queue = client.distube.getQueue(message);
        const voice_channel = message.member.voice;

        if(!voice_channel.channel)return(message.channel.send("Debes estar en un canal de voz"))
        if(!queue)return(message.channel.send("No hay cancion que skipear"))     

        try {
            const skip = await queue.skip()
        } catch (err) {
                console.log(err)
        }
    }
}