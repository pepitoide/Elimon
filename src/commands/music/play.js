const Discord = require("discord.js")
const embed = require("../../funciones/embed")
const music = require("../../funciones/music")
const config = require("../../funciones/server_config")

module.exports = {
    name: "play",
    alias: ["musica", "p", "m"],

    async execute(client, message, args) {

        const voice_channel = message.member.voice;
        const cancion = args.join(" ");

        if (!voice_channel.channel) return (message.channel.send({ embeds: [embed.embed_music(txt = "❌ Debes estar en un canal de voz")] }))
        const reqdb = await config.buscar(server_id = message.guild.id)
        if (!reqdb || !reqdb.guild.music.activate) return (message.channel.send({ embeds: [embed.embed_music(txt = "❌ La opcion de musica esta desabilitada")] }))

        if (args.length > 0) {
            try {

                let qe = await client.distube.getQueue(message.guild.id)
                if (!qe) {
                    client.distube.play(message.member.voice.channel, cancion, {
                        textChannel: message.channel,
                        member: message.member,
                    })
                }

                if (qe) {
                    let search_song = await client.distube.search(cancion)
                    let songslist = qe.songs.map(e => e.name)
                    if (songslist.includes(`${search_song.shift().name}`)) return (message.channel.send({ embeds: [embed.embed_music(txt = "**La cancion ya fue añadida**")] }))

                    client.distube.play(message.member.voice.channel, cancion, {
                        textChannel: message.channel,
                        member: message.member,
                    })
                }
            } catch (err) { return (console.log(err)) }

            const server_id = message.guild.id;
            const user_id = message.author.id;
            const search = await music.buscar(server_id, user_id)
            if (!search) {

                setTimeout(async () => {
                    let queue = client.distube.getQueue(message.guild.id)
                    if (queue) {
                        let song = await queue.songs.map(e => e)
                        music.create(server_id, user_id, song.pop())
                    } else console.log("No se ha guardado la cancion")
                }, 2000);
            }

            if (search) {
                setTimeout(async () => {
                    let queue = await client.distube.getQueue(message.guild.id)
                    if (queue) {
                        let song = queue.songs.map(e => e)
                        music.update(server_id, user_id, song.pop())
                    } else console.log("No se ha guardado la cancion")
                }, 2000);

            }

            return

        } else return (message.channel.send("Debes poner el nombre de la cancion o un link"))

    }
}