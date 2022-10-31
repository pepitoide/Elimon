const embed = require("../../funciones/embed")
const server_config = require("../../funciones/server_config")
const { PermissionFlagsBits } = require("discord.js");

module.exports = {
    name: "set",
    alias: "configurar",

    async execute(client, message, args) {
        const permisson = message.member.permissions.has(PermissionFlagsBits.Administrator);
        if (!permisson) return (message.channel.send({ embeds: [embed.embed_red(txt = "No tienes permiso de administrador, no puedes ejecutar el comando")] }))
        if (args.length <= 0) return (message.channel.send({ embeds: [embed.embed_red(txt = "**Faltan argumentos, +help para ver las lista de Commands**")] }))
        const reqdb = await server_config.buscar(server_id = message.guild.id)
        if (!reqdb) return (message.channel.send("Ha ocurrido un error, intentalo en 1 minuto"))

        if (args[0].toLocaleLowerCase() === "logs") {
            if (args[1] && args[1].toLocaleLowerCase() === "on") {
                if (reqdb.guild.logs.activate) return (message.channel.send({ embeds: [embed.embed_elimon(txt = "**Los logs ya estan activados**")] }))
                if (!args[2] || !args[2].startsWith("<#")) return (message.channel.send({ embeds: [embed.embed_red(txt = "**Debes mencionar un canal**")] }))

                try {
                    const channel_filter = args[2].trim().slice(2).split("");
                    let d = channel_filter.pop();
                    const channelSet = await message.guild.channels.fetch(`${channel_filter.join("")}`)

                    server_config.update_server_config_logs(server_id = message.guild.id, channelSet, type = 1, active = true).then(e => {
                        if (e) {
                            message.channel.send({ embeds: [embed.embed_elimon(txt = "**Se ha configurado el canal de logs**")] })
                        }
                    })
                } catch (err) {
                    console.log(`error de server config "canal no existe" ${err}`)
                    message.channel.send({ embeds: [embed.embed_red(txt = "**El canal no existe**")] })
                }

            } else if (args[1] && args[1].toLocaleLowerCase() === "off") {
                if (reqdb.guild.logs.activate === false) return (message.channel.send({ embeds: [embed.embed_elimon(txt = "**Los logs ya estan desactivados**")] }))
                server_config.update_server_config_logs(server_id, channelSet = false, type = 1, active = false).then(e => {
                    if (e) {
                        message.channel.send({ embeds: [embed.embed_elimon(txt = "**Se ha deshabilitado la opcion de logs**")] })
                    }
                })
            } else return (message.channel.send({ embeds: [embed.embed_red(txt = "**Como tercer parametro debes poner on o off \n ejem: [+set logs ON #canal]**")] }))

        } else if (args[0].toLocaleLowerCase() === "music") {
            if (args[1] && args[1].toLocaleLowerCase() === "on") {
                if (reqdb.guild.music.activate) return (message.channel.send({ embeds: [embed.embed_elimon(txt = "**La musica ya esta activada**")] }))

                server_config.update_server_config_logs(server_id = message.guild.id, channelSet = false, type = 2, active = true).then(e => {
                    if (e) {
                        message.channel.send({ embeds: [embed.embed_elimon(txt = "**Se ha configurado la opcion de musica**")] })
                    }
                })

            } else if (args[1] && args[1].toLocaleLowerCase() === "off") {
                if (reqdb.guild.logs.activate === false) return (message.channel.send({ embeds: [embed.embed_elimon(txt = "**La musica ya esta desactivada**")] }))
                server_config.update_server_config_logs(server_id, channelSet = false, type = 2, active = false).then(e => {
                    if (e) {
                        message.channel.send({ embeds: [embed.embed_elimon(txt = "**La musica ha sido desactivada**")] })
                    }
                })
            } else return (message.channel.send({ embeds: [embed.embed_red(txt = "**Como tercer parametro debes poner on o off \n ejem: [+set logs ON #canal]**")] }))
            

        } else return (message.channel.send({embeds:[embed.embed_red(txt = "**El subcomando no existe**")]}))
    }

}