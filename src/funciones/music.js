const embed = require("./embed")
const musicdb = require("../db/Modelos/music_db")

async function skip(client, interaction){

    const guild_id = interaction.guildId;
    const voice_channel = interaction.guild.voiceStates.cache.get(interaction.user.id);
    const queue = client.distube.getQueue(guild_id);

    if(!voice_channel){
        let txt = `**<@${interaction.user.id}> Debes estar en un canal de voz*`
        return(interaction.reply({embeds:[embed.embed_music(txt)]}))
    }
    if(!queue){
        
        let txt = "**No hay cancion que saltar**"
        return(interaction.reply({embeds:[embed.embed_music(txt)]}))
    }     

    try {
        const skip = await queue.skip()
    } catch (err) {
        console.log(err)
    }

    return
}

async function pause(client, interaction){

    const guild_id = interaction.guildId;
    const voice_channel = interaction.guild.voiceStates.cache.get(interaction.user.id);
    const queue = client.distube.getQueue(guild_id);
    
    if(!voice_channel){
        let txt = `**<@${interaction.user.id}> Debes estar en un canal de voz*`
        return(interaction.reply({embeds:[embed.embed_music(txt)]}))
    }
    if(!queue){
        
        let txt = "**No hay cancion que pausar**"
        return(interaction.reply({embeds:[embed.embed_music(txt)]}))
    }

    if(queue.paused)return(false);

        try {
            const pause = await queue.pause()
        } catch (err) {
            console.log(err)
        }

    return(true)
}

async function renudar(client, interaction){

    const guild_id = interaction.guildId;
    const voice_channel = interaction.guild.voiceStates.cache.get(interaction.user.id);
    const queue = client.distube.getQueue(guild_id);

    if(!voice_channel){
        let txt = `**<@${interaction.user.id}> Debes estar en un canal de voz*`
        return(interaction.reply({embeds:[embed.embed_music(txt)]}))
    }
    if(!queue){
        
        let txt = "**No hay cancion que renudar**"
        return(interaction.reply({embeds:[embed.embed_music(txt)]}))
    }
    if(queue.playing)return(false)     
    try {
        const resume = await queue.resume()
    } catch (err) {
        console.log(err)
    }
    return(true);
}

async function stop(client, interaction){

    const guild_id = interaction.guildId;
    const voice_channel = interaction.guild.voiceStates.cache.get(interaction.user.id);
    const queue = client.distube.getQueue(guild_id);
    
    if(!voice_channel){
        let txt = `**<@${interaction.user.id}> Debes estar en un canal de voz*`
        return(interaction.reply({embeds:[embed.embed_music(txt)]}))
    }
    if(!queue){
        
        let txt = `**<@${interaction.user.id}> No hay cancion que parar**`
        return(interaction.reply({embeds:[embed.embed_music(txt)]}))
    }     

    try {
        const stop = await queue.stop()
        let txt = `La cancion ha sido pausado por <@${interaction.user.id}>`
        return(interaction.reply({embeds:[embed.embed_music(txt)]}))
    } catch (err) {
        console.log(err)
    }
    return
}

async function autoplay(client, interaction){

    const guild_id = interaction.guildId;
    const voice_channel = interaction.guild.voiceStates.cache.get(interaction.user.id);
    const queue = client.distube.getQueue(guild_id);

    if(!voice_channel){
        let txt = `**<@${interaction.user.id}> Debes estar en un canal de voz*`
        return(interaction.reply({embeds:[embed.embed_music(txt)]}))
    }
    if(!queue){
        
        let txt = "**No hay cancion en la lista**"
        return(interaction.reply({embeds:[embed.embed_music(txt)]}))
    }
    
    if(queue.autoplay)return(interaction.reply({embeds:[embed.embed_music(txt = "**El autoplay ya esta activado**")]}))
    try {
        const autoplay = await queue.toggleAutoplay()
        interaction.reply({embeds:[embed.embed_music(txt = `**Autoplay activado por <@${interaction.user.id}>**`)]})
    } catch (err) {
        console.log(err)
    }

    return
}

async function music_create(server_id, user_id, song){
    let create = new musicdb({server_id: `${server_id}`, user_id: `${user_id}`, songs: {song: `${song.name}`, url: `${song.url}`}})
    create.save()
    return
}

async function buscar(server_id, user_id){
    let search = musicdb.findOne({server_id: `${server_id}`, user_id: `${user_id}`})
    return search
}

async function music_update(server_id, user_id, song){
    let search = await buscar(server_id, user_id)
    let r = search.songs.map(e=> e.song)
    if(r.includes(`${song.name}`))return
    const update = musicdb.updateOne({server_id: `${server_id}`, user_id: `${user_id}`}, {$push: {songs: {song: `${song.name}`, url: `${song.url}`}}})
    return update
}

exports.skip = skip;
exports.pause = pause;
exports.renudar = renudar;
exports.stop = stop;
exports.create = music_create;
exports.buscar = buscar;
exports.update = music_update;
exports.autoplay = autoplay;