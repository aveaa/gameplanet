const Discord = require("discord.js");
const fs = require("fs");
let config = require("../botconfig.json");

//command: no permission
module.exports.noPerms = (message, perm) => {
    let embed = new Discord.RichEmbed()
        .setTitle("🇽 Ошибка")
        .setColor("#b70000")
        .addField("Требуется разрешение!", perm);

    message.channel.send(embed).then(m => m.delete(10000));
}

module.exports.noUser = (message, perm) => {
    let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setTitle("🇽 Ошибка")
        .setColor("#b70000")
        .setDescription(perm);

    message.channel.send(embed).then(m => m.delete(10000));
}

//command: Worning
module.exports.noW = (message, perm) => {
    let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setTitle("⚠ Внимание")
        .setColor("#FFFF00")
        .setDescription(perm);

    message.channel.send(embed).then(m => m.delete(10000));
}

module.exports.equalPerms = (message, user, perms) => {

    let embed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setColor("#b70000")
        .setTitle("🇽 Ошибка")
        .addField(`${user} has perms`, perms);

    message.channel.send(embed).then(m => m.delete(10000));
}

module.exports.botuser = (message) => {
    let embed = new Discord.RichEmbed()
        .setTitle("🇽 Ошибка")
        .setDescription("You cannot ban a bot.")
        .setColor("#b70000");

    message.channel.send(embed).then(m => m.delete(10000));
}

module.exports.cantfindUser = (channel) => {
    let embed = new Discord.RichEmbed()
        .setTitle("🇽 Ошибка")
        .setDescription("Could not find that user.")
        .setColor("#b70000");

    message.channel.send(embed).then(m => m.delete(10000));
}

//command: no reason
module.exports.noReason = (message, perm) => {
    message.delete().catch(O_o => {});
    let embed = new Discord.RichEmbed()
        .setTitle("🇽 Ошибка")
        .setDescription(perm)
        .setColor("#b70000");

    message.channel.send(embed).then(m => m.delete(10000));
}