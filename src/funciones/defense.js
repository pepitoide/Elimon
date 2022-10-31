const Discord = require("discord.js");

async function defense(client, message) {
    
    if(message.author.id === message.member.guild.ownerId)return

    const lastsMessages = await message.channel.messages.fetch({limit: 10, cache: false })    
    const message_filter = lastsMessages.filter(e=> e.author.id === message.author.id)
    var conincidences = 0;

    message_filter.forEach(e => {
        if(e.content === message.content){
            conincidences++
        }
    });

    if(conincidences >= 5){
        if(message.author.bot){
            const ban = await message.member.ban()
            message.channel.send(`se ha baneado al bot <@${message.author.id}> por spam`)
            return
        }
        const timeout = await message.member.timeout(5 * 60 * 20, "Spam")
        const DeleteMessages = await message.channel.messages.fetch({limit: 30, cache: false })    
        const Deletemessage_filter = DeleteMessages.filter(e=> e.author.id === message.author.id)
    }
    
}

exports.defense = defense;