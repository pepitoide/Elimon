const music = require("../../funciones/music")
const embed = require("../../funciones/embed")

module.exports = {
    name: "plist",
    alias: ["playlist"],

    async execute(client, message, args){

        const voice_channel = message.member.voice;
        const server_id = message.guild.id
        
        if(!voice_channel.channel)return(message.channel.send({embeds:[embed.embed_music(txt = "**Debes estar en un canal de voz**")]}))

        if(args.length == 0){
            let user_id =  message.author.id
            let req = await music.buscar(server_id, user_id)

            if(!req)return(message.channel.send({embeds:[embed.embed_music(txt = "**Aún no has escuchado ninguna canción conmigo 😢**")]}))
            if(req){

                try {

                    const playlist = await client.distube.createCustomPlaylist(req.songs.map(e => {return e.url}), {
                        member: message.member,
                        properties: { name: `PlayList de <@${req.user_id}>`, source: "custom" },
                        parallel: true
                    });

                    client.distube.play(message.member.voice.channel, playlist, {
                        textChannel: message.channel,
                        member: message.member,
                    }) 

                } catch (err){return(message.channel.send("La cancion no se ha encontrado o ha ocurrido un error interno"))}

            }
            return
        }

        const mention = args[0].trim().slice(2).split("")
        let d = mention.pop();

        if(args[0] === `<@${mention.join("")}>`){
            let user_id = mention.join("")
            let req = await music.buscar(server_id, user_id)

            if(!req)return(message.channel.send({embeds:[embed.embed_music(txt = "**Aún no ha escuchado ninguna canción conmigo 😢**")]}))
            if(req){

                try {

                    const playlist = await client.distube.createCustomPlaylist(req.songs.map(e => {return e.url}), {
                        member: message.member,
                        properties: { name: `PlayList de <@${req.user_id}>`, source: "custom" },
                        parallel: true
                    });

                    client.distube.play(message.member.voice.channel, playlist, {
                        textChannel: message.channel,
                        member: message.member,
                    }) 

                } catch (err){return(message.channel.send("La cancion no se ha encontrado o ha ocurrido un error interno"))}

            }
            return
        }

        return(message.channel.send({embeds:[embed.embed_music(txt = "No se encontro su peticion o comando/subcomando no valido")]}))

    }
}