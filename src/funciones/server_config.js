const config = require("../db/Modelos/server_config_model")

async function buscar(server_id) {
    const reqdb = await config.findOne({ server_id: `${server_id}` })
    return reqdb
}

async function create_server_config(server_id, server_name) {
    let reqdb = await config.findOne({ server_id: `${server_id}` })
    if (reqdb) return
    if (!reqdb) {
        let create = new config({ server_id: `${server_id}`, name: `${server_name}` })
        create.save()
        return (console.log("--Server config created"))
    }
}

async function delete_server_config(server_id) {
    let reqdb = await config.findOne({ server_id: `${server_id}` })
    if (!reqdb) return
    if (reqdb) {
        let delete_config = await config.deleteOne({ server_id: `${server_id}`})
        return (console.log("--Server config deleted"))
    }
}

async function update_server_config_logs(server_id, channelSet, type, active) {
    if (type === 1) {
        if (active) {
            let update = await config.updateOne({ server_id: `${server_id}` }, { $set: { "guild.logs.activate": true, "guild.logs.channel": `${channelSet.id}` } })
            return true
        } else {
            let update = await config.updateOne({ server_id: `${server_id}` }, { $set: { "guild.logs.activate": false } })
            return true
        }
    }

    if (type === 2) {
        if (active) {
            let update = await config.updateOne({ server_id: `${server_id}` }, { $set: { "guild.music.activate": true} })
            return true
        } else {
            let update = await config.updateOne({ server_id: `${server_id}` }, { $set: { "guild.music.activate": false } })
            return true
        }
    }

    return
}

exports.create_server_config = create_server_config;
exports.delete_server_config = delete_server_config;
exports.update_server_config_logs = update_server_config_logs;
exports.buscar = buscar