const embed = require("../../funciones/embed")

module.exports = {
    name: "dado",
    alias: "dado",

    async execute(client, message, args, comando){
        let numDado = Math.floor(Math.random() * 7)

        if(numDado >= 1 && numDado <= 3){
            message.channel.send({ embeds: [embed.embed_elimon(txt = `**<@${message.author.id}> Tu numero es ||  ${numDado}||  **, sinceramente podrias sacar mejor numero`)] })
        }else if(numDado >= 4){
            message.channel.send({ embeds: [embed.embed_elimon(txt = `**<@${message.author.id}> Tu numero es ||  ${numDado}||  **, vaya, no es mal numero`)] })
        }else if(numDado === 0){
            message.channel.send({ embeds: [embed.embed_elimon(txt = `**<@${message.author.id}> Tu dado se ha caido de la mesa, tira de nuevo`)] })
        }
    }
}