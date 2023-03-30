const embed = require("../../funciones/embed")

module.exports = {
    name: "sorteo",
    alias: "suerte",

    async execute(client, message, args, comando) {

        try {
            let suerte = Math.floor(Math.random() * args[0])
            message.channel.send({embeds: [embed.embed_elimon(op = 1, val1 = `**<@${message.author.id}> El numero ganador es ||${suerte}||** \n\n**Vaya suerte que tiene es@!**`)]})
        } catch (error) {
            console.log("Solo numeros como segundo parametro")
        }
    }
}