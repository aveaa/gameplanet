//==========================//
//🔸 PLANET 🌎 GAME 🔸 © 2018//
//==========================//
//🔸 PLANET 🌎 BOT 🔸 © 2018 //
//==========================//

const Discord = require('discord.js');
const request = require('request');
const botconfig = require('./botconfig.json');
const errors = require('./utils/errors.js');
let coins = require("./coins.json");
let xp = require("./xp.json");
const fs = require('fs');
const bot = new Discord.Client();
let p = "-"

/* рандомные вырожения в .setFooter(); */
const server_n = [
    "CONFA GAMES",
    "Внимание | © Все права защищены", 
    "Будь позитивным!", 
    "Не кури", 
    "Проветри комнату!", 
    "Займись спортом", 
    "Не делай глупости", 
    "Ну будь ЧСВ!", 
    "Будь адекватным", 
    "Иди по гуляй", 
    "С ходи по ешь!", 
    "Не будь как все", 
    "Не будь лохом",
    "Не гуляй до позна",
    "Обнови телефон!",
    "По слушай музыку!",
    "Будь проще!",
    "Будь смелее!",
    "Будь уникальным",
    "Не делай ошибки",
    "Не нарушай правило",
    "Стримись к лучшему!",
    "Будь собой!",
    "Освободите память телефона для Главного!"
];

/* ID создателя */
const creator_id = '410838014990876672';

/* Bot Online */
bot.on("ready", async () => {
    console.log(`${bot.user.username} is online`);  
    bot.user.setActivity(`-help | CONFA GAMES`, {type: "WATCHING"});     //Смотрит   {},
    //bot.user.setGame("-help | ");
});

/* Function for Greeting */
function declOfNum(number, titles) {
    let cases = [2, 0, 1, 1, 1, 2];
    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
}

/* Greeting */
bot.on("guildMemberAdd", member => {
    let boticon = "https://images-ext-2.discordapp.net/external/YsSMlCi2Ht7AJ_Aove5P9vCIV8H8hVYdAaQ8avwWoTY/https/images-ext-1.discordapp.net/external/aD8rh4IUxApLYtTc4tVmAq5uqnGw7Vz1b9xaxNXKQAc/%253Fsize%253D2048/https/cdn.discordapp.com/avatars/473439364546953237/12cf86ee18a26d4b03faba85e434aa3c.png" 
    const embed = new Discord.RichEmbed()
        .setTitle("Добро пожаловать на наш сервер " + member.guild.name)
        .setColor("3B024D")
        .setDescription("На нашем сервере ты сможешь пообщаться или найти новых друзей для совместной игры." + 
        "\n__**Мы рады что ты присоеденисля к нам, теперь у нас на одного ГЕЙМЕРА больше!**__" + 
        `\nНа данный момент на сервере **${member.guild.memberCount} ${declOfNum(member.guild.memberCount, ['человек', 'человека', 'человек'])}**`)
        .setFooter("CONFA GAMES")
        .setThumbnail(boticon)
        .setTimestamp();
        member.user.send({embed});
});

bot.on("guildMemberRemove", member => {
    let rChannel = member.guild.channels.find(`name`, "chat");
    rChannel.send(`${member}` + " только что покинул сервер **CONFA GAMES**");
});

//команды бота
bot.on('message', message => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let server_name = (server_n[Math.floor(Math.random() * server_n.length)])
    const args = message.content.slice(p.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(!coins[message.author.id]){
        coins[message.author.id] = {
        coins: 0
        };
        }
    
      let coinAmt = Math.floor(Math.random() * 15) + 1;
      let baseAmt = Math.floor(Math.random() * 15) + 1;
      console.log(`${coinAmt} ; ${baseAmt}`);
    
      if(coinAmt === baseAmt){
        coins[message.author.id] = {
          coins: coins[message.author.id].coins + coinAmt
        };
      fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
        if (err) console.log(err)
      });
      let coinEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.username)
    .setColor("ffd500")
    .setDescription("💸" + ` Добавлено ${coinAmt} Коинов!`)
    .setFooter(server_name)
    .setTimestamp();
    
      message.channel.send(coinEmbed).then(msg => {msg.delete(15000)});
    }

    let xpAdd = Math.floor(Math.random() * 7) + 8;
    console.log(xpAdd);

    if(!xp[message.author.id]){
        xp[message.author.id] = {
        xp: 0,
        level: 1
        };
    }

  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].level;
  let nxtLvl = xp[message.author.id].level * 300;
  xp[message.author.id].xp =  curxp + xpAdd;
  if(nxtLvl <= xp[message.author.id].xp){
    xp[message.author.id].level = curlvl + 1;
    let lvlup = new Discord.RichEmbed()
    .setTitle("**Новый уровень!**")
    .setColor("ffd500")
    .setDescription("Уровень повышен до" + curlvl + 1 + "-го")
    .setFooter(server_name)
    .setTimestamp();

    message.channel.send(lvlup).then(msg => {msg.delete(15000)});
  }
  fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
    if(err) console.log(err)
  });

    if(message.content.startsWith(p + `help`)) {
        let hicon = "http://download.seaicons.com/icons/paomedia/small-n-flat/1024/sign-question-icon.png"
                 
        message.delete()
        const embed = new Discord.RichEmbed()
            .setTitle("#⃣ Помощь")
            .setColor("ffd500")
            .setDescription("📜 **Список команд:**\n\n⚠ **Moderation:**\n-ban [user] [reason] - За банить. (⚠ временно недоступно !)\n-kick [user] [reason] - Кикнуть.\n-report [user] [reason] - Написать репорт.\n-clear [number] - Очистить чат.\n\nℹ **Info:**\n-serverinfo - Информация о сервере.\n-botinfo - Информация о боте.\n-news [text] - Создать новость.\n\n⚜ **Fun:**\n-kiss [user] - Поцеловать.\n-hug [user] - Обнять.\n-pat [user] - Погладить по голове.\n-slap [user] - Ударить.\n-tickle [user] - Пощекотать.\n-cuddle [user] - Прижатся.\n-poke [user] - Тыкнуть.\n\n🎮 **Games:**\n-rsp [к/н/б] - камень/ножници/бумага.\n-ship [не обязательно] - МАТЧМЕЙКИНГ.\n\n🌐 **Social:**\n-sms [user] [message] - Отправлю sms пользователю.\n-idea [text] - Отправить идею об улучшении сервера.\n-level - Узнать свой уровень.\n-coins - Узнать сколько Коинов.\n-pay [@user] [number] - Передать коины.\n\n🔧 **Tools:**\n-avatar [user] - Покажу аватарку пользователя.\n-ping - Посмотреть пинг бота.\n-test - Тестировать бота.\n-eval [code] - Эмулировать код.\n-say [text] - Сказать от имени бота.\n\n🚩 **Other:**\n-afk - Скажу что вы отошли.\n-creator - Узнать кто создатель бота!\n-bot on - Бот будет вечно писать.\n-bot off - Бот не будет писать.")
            .setFooter(server_name)
            .setThumbnail(hicon)
            .setTimestamp();
        message.channel.send({embed}).then(sentMessage => {   
        sentMessage.react('🇭')
            .then(() => sentMessage.react('🇪'))
                .then(() => sentMessage.react('🇱'))
                .then(() => sentMessage.react('🇵'))
                .catch(() => errors.noReason(message, "Один из emoji не отреагировал!"));
    });
    }

    if(message.content.startsWith(p + `pay`)) {
    
    if(!args[0]) return errors.noReason(message, "Укажите [@user] [number]");
    if(!coins[message.author.id]){
        return errors.noReason(message, "У вас нет коинов!")
      }
    
      let pUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    
      if(!coins[pUser.id]){
        coins[pUser.id] = {
          coins: 0
        };
      }
    
      let pCoins = coins[pUser.id].coins;
      let sCoins = coins[message.author.id].coins;
    
      if(sCoins < args[0]) return errors.noReason(message, "Не хватает коинов!");
    
      coins[message.author.id] = {
        coins: sCoins - parseInt(args[1])
      };
    
      coins[pUser.id] = {
        coins: pCoins + parseInt(args[1])
      };
    
      message.channel.send(`${message.author} дал ${pUser} ${args[1]} коинов.`);
    
      fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
        if(err) cosole.log(err)
      });
    }

    if(message.content.startsWith(p + `coins`)) {
        message.delete();
    if(!coins[message.author.id]){
        coins[message.author.id] = {
          coins: 0
        };
      }
    
      let uCoins = coins[message.author.id].coins;
    
    
      let coinEmbed = new Discord.RichEmbed()
      .setAuthor(message.author.username)
      .setColor("#ffd500")
      .setDescription("💸" + uCoins + " коинов!")
      .setFooter(server_name)
      .setTimestamp();
    
      message.channel.send(coinEmbed).then(msg => {msg.delete(15000)});
    }

    if(message.content.startsWith(p + `level`)) {
        message.delete();

        if(!xp[message.author.id]){
         xp[message.author.id] = {
           xp: 0,
           level: 1
        };
      }
        let curxp = xp[message.author.id].xp;
        let curlvl = xp[message.author.id].level;
        let nxtLvlXp = curlvl * 300;
        let difference = nxtLvlXp - curxp;
      
        let lvlEmbed = new Discord.RichEmbed()
        .setAuthor(message.author.username)
        .setColor("ffd500")
        .addField("Уровень", curlvl, true)
        .addField("XP", curxp, true)
        .setFooter(`${difference} XP для повышения уровня `, message.author.displayAvatarURL)
        .setTimestamp();
      
        message.channel.send(lvlEmbed).then(msg => {msg.delete(15000)});
      
      }

    if(message.content.startsWith(p + `ship`)) {
        message.delete();
        if (!args[0]) args[0] = message.guild.members.random();
        if (!args[1]) args[1] = message.author
        if (args[0].length > 30 || args[1].length > 30) return errors.noReason(message, "**Аргумент не может быть длиннее 30 символов**");
        let loveText
        let shkala
        let percents = Math.floor(Math.random() * 100) + 1;
        if (percents <= 99) {loveText = 'Нереально !!! :heart_eyes:'; shkala = '■■■■■■■■■□';}
        if (percents <= 89) {loveText = 'Превосходно! :heartpulse:'; shkala = '■■■■■■■■□□';}
        if (percents <= 79) {loveText = 'ммм :3 не чо так !'; shkala = '■■■■■■■□□□';}
        if (percents <= 69) {loveText = 'Дружески :+1:'; shkala = '■■■■■■□□□□';}
        if (percents <= 59) {loveText = 'Неплохо :confused:'; shkala = '■■■■■□□□□□';}
        if (percents <= 49) {loveText = 'Средне :thinking:'; shkala = '■■■■□□□□□□';}
        if (percents <= 49) {loveText = 'Плохо :frowning2:'; shkala = '■■■□□□□□□□';}
        if (percents <= 29) {loveText = 'Очень плохо :disappointed_relieved:'; shkala = '■■□□□□□□□□';}
        if (percents <= 19) {loveText = 'Ужасно :sob:'; shkala = '■□□□□□□□□□';}
        if (percents <= 9) {loveText = 'Хуже некуда :poop:'; shkala = '□□□□□□□□□□';}
        if (percents >= 100) {loveText = 'ИДЕАЛЬНО!!! 🎮'; shkala = '■■■■■■■■■■'; percents = 100;}
        const embed = new Discord.RichEmbed()
            .setTitle("МАТЧМЕЙКИНГ")
            .setColor("ffd500")
            .setDescription('▼***' + args[0] + '***\n▲***' + args[1] + '***\n\n🎮 Игровай **мощь** в проценатах: **' + percents + '%** `[' + shkala + ']`\n' + '\n\nВердикт: **' + loveText + '**')
            .setFooter(server_name)
            .setTimestamp();
        message.channel.send({embed});
    }

    if(message.content.startsWith(p + `rsp`)) {        
        let userChoice;
                if (!args[0]) {
                    return errors.noReason(message, "Вы забыли указать к/н/б !")
                }
                else if (['камень', 'rock', 'r', 'к'].includes(args[0].toLowerCase())) {
                    userChoice = 'камень';
                }
                else if (['бумагу', 'бумага', 'paper', 'p', 'б'].includes(args[0].toLowerCase())) {
                    userChoice = 'бумагу';
                }
                else if (['scissors', 'ножницы', 's', 'н'].includes(args[0].toLowerCase())) {
                    userChoice = 'ножницы';
                } else {
                    userChoice = 'Incorrect';
                }
                let computerChoice = Math.random();
                if (computerChoice < 0.34) {
                    computerChoice = "камень";
                } else if(computerChoice <= 0.67) {
                    computerChoice = "бумагу";
                } else {
                    computerChoice = "ножницы";
                }
                function rspCW(userChoice, computerChoice) {
                    let award = Math.floor(Math.random() * 3) + 1;
                    if (userChoice === computerChoice) {
                        return "**Ничья!**😀";
                    }
                    else if(userChoice === "камень") {
                        if(computerChoice === "ножницы") {
                            return "**Ты выиграл(а)!** 😢";
                        }
                        else if (computerChoice === "бумагу") {
                            return "**Ты проиграл(а).** 😎";
                        }
                    }
                    else if(userChoice === "бумагу") {
                        if(computerChoice === "камень") {
                            return "**Ты выиграл(а)!** 😢";
                        } else if (computerChoice === "ножницы") {
                            return "**Ты проиграл(а).** 😎";
                        }
                    }
                    else if(userChoice === "ножницы") {
                        if(computerChoice === "бумагу") {
                            return "**Ты выиграл(а)!** 😢";
                        } else if (computerChoice === "камень") {
                            return "**Ты проиграл(а).** 😎";
                        }
                    }
                    else if (userChoice === 'Incorrect') {
                        return " **Ты не выбрал ни камень, ни ножницы, ни бумагу**";
                    }
                }
                if (userChoice === 'Incorrect') {
                    message.channel.send(message.author + rspCW(userChoice, computerChoice))
                }
                else {
                const embed = new Discord.RichEmbed()
                .setTitle(rspCW(userChoice, computerChoice))
                .setColor('RANDOM')
                .addField("**Бот выбрал**", computerChoice, true)
                .addField("**Ты выбрал(a)**", userChoice, true)
                .setFooter(server_name)
                .setTimestamp();
                message.channel.send({embed})
                message.delete();
             }
            };

    if(message.content.startsWith(p + `avatar`)) {
        let member = message.mentions.members.first();
        if (!member) return errors.noReason(message, "Не удалось получить аватарку пользователя !");
        const embed = new Discord.RichEmbed()
            .setTitle(`Аватарка пользователя ${member.user.tag}`)
            .setImage(member.user.avatarURL)
            .setFooter(server_name)
            .setColor("ffd500")
            .setTimestamp()
            .setDescription('Аватарка предоставлена по запросу '+ message.author);
        message.channel.send({embed});
        message.delete();
    }

    if (message.content.startsWith(p + `kiss`)) {
        message.delete();
        let user = message.author;
        let user1 = message.mentions.users.first();
        if (!user1 || user1.id === user.id) {
            user = bot.user;
            user1 = message.author;
        }
        message.channel.send('Загрузка...').then(msg => {
            request('https://nekos.life/api/v2/img/kiss', function (error, response, body) {
                try {
                    let arr = JSON.parse(body);
                    let embed = new Discord.RichEmbed()
                        .setDescription(`${user} **поцеловал(а)** ${user1}`)
                        .setImage(arr['url'])
                        .setColor('RANDOM')
                        .setFooter(server_name) 
                        .setTimestamp(); 
                        msg.edit({embed
                        }).then(function(message) {
                            message.react("♥")
                        }).catch(function() {});
                        } catch (e) {
                       console.log(e)
                 }
            });
        });
    }

    if (message.content.startsWith(p + `hug`)) {
        message.delete();
        let user = message.author;
        let user1 = message.mentions.users.first();
        if (!user1 || user1.id === user.id) {
            user = bot.user;
            user1 = message.author;
        }
        message.channel.send('Загрузка...').then(msg => {
            request('https://nekos.life/api/v2/img/hug', function (error, response, body) {
                try {
                    let arr = JSON.parse(body);
                    let embed = new Discord.RichEmbed()
                        .setDescription(`${user} **обнял(а)** ${user1}`)
                        .setImage(arr['url'])
                        .setColor('RANDOM')
                       .setFooter(server_name) 
                       .setTimestamp();
                       msg.edit({embed
                       }).then(function(message) {
                           message.react("🤝")
                       }).catch(function() {});
                       } catch (e) {
                      console.log(e)
                 }
            });
        });
    }

    if (message.content.startsWith(p + `pat`)) {
        message.delete();
        let user = message.author;
        let user1 = message.mentions.users.first();
        if (!user1 || user1.id === user.id) {
            user = bot.user;
            user1 = message.author;
        }
        message.channel.send('Загрузка...').then(msg => {
            request('https://nekos.life/api/v2/img/pat', function (error, response, body) {
                try {
                    let arr = JSON.parse(body);
                    let embed = new Discord.RichEmbed()
                        .setDescription(`${user} **погладил(а) по голове** ${user1}`)
                        .setImage(arr['url'])
                        .setColor('RANDOM')
                        .setFooter(server_name) 
                        .setTimestamp();
                        msg.edit({embed
                    }).then(function(message) {
                        message.react("✋")
                    }).catch(function() {});
                    } catch (e) {
                   console.log(e)
                     }
                });
            });
        }

        if (message.content.startsWith(p + `slap`)) {
        message.delete();
        let user = message.author;
        let user1 = message.mentions.users.first();
        if (!user1 || user1.id === user.id) {
            user = bot.user;
            user1 = message.author;
        }
        message.channel.send('Загрузка...').then(msg => {
            request('https://nekos.life/api/v2/img/slap', function (error, response, body) {
                try {
                    let arr = JSON.parse(body);
                    let embed = new Discord.RichEmbed()
                        .setDescription(`${user} **ударил(а)** ${user1}`)
                        .setImage(arr['url'])
                        .setColor('RANDOM')
                        .setFooter(server_name) 
                        .setTimestamp();
                        msg.edit({embed
                        }).then(function(message) {
                            message.react("👊")
                        }).catch(function() {});
                        } catch (e) {
                       console.log(e)
                 }
            });
        });
    }

    if (message.content.startsWith(p + `poke`)) {
        message.delete();
        let user = message.author;
        let user1 = message.mentions.users.first();
        if (!user1 || user1.id === user.id) {
            user = bot.user;
            user1 = message.author;
        }
        message.channel.send('Загрузка...').then(msg => {
            request('https://nekos.life/api/v2/img/poke', function (error, response, body) {
                try {
                    let arr = JSON.parse(body);
                    let embed = new Discord.RichEmbed()
                        .setDescription(`${user} **тыкнул(а) в** ${user1}`)
                        .setImage(arr['url'])
                        .setColor('RANDOM')
                        .setFooter(server_name) 
                        .setTimestamp();
                        msg.edit({embed
                        }).then(function(message) {
                            message.react("👉")
                        }).catch(function() {});
                        } catch (e) {
                       console.log(e)
                 }
            });
        });
    }

    if (message.content.startsWith(p + `cuddle`)) {
        message.delete();
        let user = message.author;
        let user1 = message.mentions.users.first();
        if (!user1 || user1.id === user.id) {
            user = bot.user;
            user1 = message.author;
        }
        message.channel.send('Загрузка...').then(msg => {
            request('https://nekos.life/api/v2/img/cuddle', function (error, response, body) {
                try {
                    let arr = JSON.parse(body);
                    let embed = new Discord.RichEmbed()
                        .setTitle(':3')
                        .setDescription(`${user} **прижал(а)ся к** ${user1}`)
                        .setImage(arr['url'])
                        .setColor('RANDOM')
                        .setFooter(server_name) 
                        .setTimestamp();
                        msg.edit({embed
                        }).then(function(message) {
                            message.react("👐")
                        }).catch(function() {});
                        } catch (e) {
                       console.log(e)
                 }
            });
        });
    }
    
    if (message.content.startsWith(p + `tickle`)) {
        message.delete();
        let user = message.author;
        let user1 = message.mentions.users.first();
        if (!user1 || user1.id === user.id) {
            user = bot.user;
            user1 = message.author;
        }
        message.channel.send('Загрузка...').then(msg => {
            request('https://nekos.life/api/v2/img/tickle', function (error, response, body) {
                try {
                    let arr = JSON.parse(body);
                    let embed = new Discord.RichEmbed()
                        .setDescription(`${user} **пощекотал(а)** ${user1}`)
                        .setImage(arr['url'])
                        .setColor('RANDOM')
                        .setFooter(server_name) 
                        .setTimestamp(); 
                        msg.edit({embed
                        }).then(function(message) {
                            message.react("🤣")
                        }).catch(function() {});
                        } catch (e) {
                       console.log(e)
                 }
            });
        });
    }

    if (message.content.startsWith(p + `bot on`)) {
        message.delete().catch(O_o=>{});
        message.channel.startTyping();
    }

    if (message.content.startsWith(p + `bot off`)) {
        message.delete().catch(O_o=>{});
        message.channel.stopTyping();
    }

    if(message.content.startsWith(p + 'say')) {
        if(!args[0]) return errors.noReason(message, "Укажите сообщение !");
        message.delete().catch(O_o=>{});
        let say = message.content.slice((p + 'say').length);
        message.channel.send(say);
    }

    if(message.content.startsWith(p + 'creator')) {
        let creata = "https://cdn.discordapp.com/avatars/410838014990876672/ad85a9456ed202a722ba25d4cdbc1dd4.png?size=2048"
        message.delete()
        let vk = "vk.com/nikita.feed"
        let grouv = "vk.com/vk.nikitafox"
        let embed = new Discord.RichEmbed()
        .setTitle("🔧 Создатель")
        .setColor("ffd500")
        .setDescription("NIKITA FOX#5591")
        .addField("🌐 Соцсети", `Я в ВК - ${vk}\n` + `Группа в ВК - ${grouv}` )
        .setThumbnail(creata)
        .setFooter(server_name)
        .setTimestamp()
        message.channel.send({embed})
    }  

    if(message.content.startsWith(p + `afk`)) {
    var afk1 = "https://google.ru.net/wp-content/uploads/2018/07/%D0%B7%D0%B0%D0%B3%D1%80%D1%83%D0%B7%D0%BA%D0%B0-%D0%BA%D0%BE%D1%82%D0%B0.gif"
        

        message.delete().catch(O_o=>{});
        let embed = new Discord.RichEmbed ()
        .setTitle(`**${message.member.displayName}**` + " отошел, скоро вернётся!")
        .setColor("ffd500")
        .setFooter(server_name)
        .setThumbnail(afk1)
        .setTimestamp();
        message.channel.send({embed}).then(sentMessage => {   
            sentMessage.react('💤')
        });
    }

    if (message.content.startsWith(p + `eval`) && message.author.id === "410838014990876672" || message.author.id === "") {
        message.delete().catch(O_o=>{});
        const code = message.content.split(" ").slice(1).join(" ");
        try {
         let evaled = eval(code);
         if (!code) {
            return errors.noReason(message, "Вы не указали код !");
        }
    
         if (typeof evaled !== 'string')
           evaled = require('util').inspect(evaled);
        
           const embed = new Discord.RichEmbed()
           .setTitle(`EVAL ✅`)
       
           .setColor("0x4f351")
           .setDescription(`📥 Input: \n \`\`\`${code}\`\`\` \n 📤 Output: \n  \`\`\`${(evaled)}\`\`\``)
       
         message.channel.send({embed});
        } catch (err) {
         const embed = new Discord.RichEmbed()
         .setTitle(`EVAL ❌`)
  
         .setColor("0xff0202")
         .setDescription(`📥 Input: \n \`\`\`${code}\`\`\` \n 📤 Output: \n  \`\`\`${(err)}\`\`\``)
    
         message.channel.send({embed});
       }
    }

    if (message.content.startsWith(p + `test`)) {
        message.delete();
        let user = message.author;
        message.channel.send('Загрузка...').then(msg => {
            const urls = [
    "https://discordemoji.com/assets/emoji/WarningPC.gif",
    "https://discordemoji.com/assets/emoji/Feels3DMan.gif",
    "https://discordemoji.com/assets/emoji/BestMates.gif"
    ];
    let embed = new Discord.RichEmbed()
          .setDescription(`**Тест бота**`)
          .setImage(urls[Math.floor(Math.random() * urls.length)])
          .setColor('RANDOM')
          .setTimestamp()
          .setFooter(server_name);
        msg.edit({embed}).then(function(message) {
              message.react("✅")
          }).catch(function() {});
    });
    }

    if (message.content.startsWith(p + 'ping')) {
        message.delete().catch(O_o => {});
        const embed = new Discord.RichEmbed()
    .setTitle("Соединение с сервером")
    .setColor("ffd500")
    .setDescription(`Ping \`\`${bot.pings[0]}ms\`\``)
    .setFooter(server_name)
    .setTimestamp();
    message.channel.send({embed});
    }

    if (message.content.startsWith(p + 'clear')) {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "MANAGE_MESSAGES");
        if(!args[0]) return errors.noReason(message, "Укажите число!");
        message.delete()
        message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send("Удаленно " + `\`\`${args[0]}\`\`` + " сообщений.").then(msg => msg.delete(5000));
    });
    }

    if (message.content.startsWith(p + 'sms')) {
        let user = message.mentions.members.first();
            if (message.member.hasPermission("MANAGE_MESSAGES")) {
                if (!user) {
                    message.delete
                    return errors.noReason(message, "Укажите получателя !");
                    return
                }
                const sendMessage = args.join(" ");
                let msg = user.send('**Вам пришло сообщение от ' + message.author + '. Он сказал:**' + sendMessage.replace(user, '')).catch(()=>{message.reply('Ошибка. Причина: **Не указано сообщение**');
                })
                message.delete().catch(O_o=>{});
            } else {
                return errors.noReason(message, "MANAGE_MESSAGES");
        }
        
    }

    if (message.content.startsWith(p + 'idea')) {
        message.delete();
        if(!args[0]) return errors.noReason(message, "Вы не указали идею, укажите её !");
        let idea = args.join(" ");
        message.guild.owner.send({embed: {
            color: 16711680,
            title: "Идея",
            description: "**Пользователь** " + message.author + " **прислал вам идею:** " + idea,
            footer: {
                text: server_name,
            },
        }});
    }

    if (message.content.startsWith(p + 'news')) {
        message.delete();
        if(!args[0]) return errors.noReason(message, "Узажите новость !");
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "MANAGE_MESSAGES");
        let news = args.join(" ");
        let embed = new Discord.RichEmbed()
        .setTitle("Новости")
        .setDescription(news)
        .setColor("ffd500")
        .setTimestamp()
        .setFooter(server_name);
        let newsChannel = message.guild.channels.find(`name`, "news");
        if (!newsChannel) return errors.noReason(message, "Не возможно найти канал news");
        newsChannel.send(embed).then(sentMessage => {   
            sentMessage.react('✅')
                .then(() => sentMessage.react('❎'))
        });
        return;   
    }

    /* ---------- Моделация ---------- */
    /* ---------- Моделация ---------- */
    /* ---------- Моделация ---------- */

    if (message.content.startsWith(p + 'kick')) {

        if(!args[0]) return errors.noReason(message, "Укажите пользователя !");
        message.delete().catch(O_o => {});
        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!kUser) return errors.noReason(message, "Неудолось найти данного пользователя !");
        let kReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "MANAGE_MESSAGES");
        if(kUser.hasPermission("MANAGE_MESSAGES")) return errors.noW(message, "Такого пользователя нельзя кикнуть !");
    
        let kickEmbed = new Discord.RichEmbed()
        .setDescription("**Kick**")
        .setColor("#b70000")
        .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
        .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
        .addField("Kicked In", message.channel)
        .addField("Tiime", message.createdAt)
        .addField("Reason", kReason)
        .setFooter(server_name);
    
        let kickChannel = message.guild.channels.find(`name`, "🔧log-bots");
        if(!kickChannel) return errors.noReason(message, "Не возможно найти канал 🔧log-bots");
    
        message.guild.member(kUser).kick(kReason);
        kickChannel.send(kickEmbed);
    
        return;
    }
    
    /*
    if (message.content.startsWith(p + 'ban')) {

        if(!args[0]) return errors.noReason(message, "Укажите пользователя !");
        message.delete().catch(O_o => {});
        let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!bUser) return errors.noBan(message, "Неудолось найти данного пользователя !");
        let bReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("MANAGE_MEMBERS")) return errors.noPerms(message, "MANAGE_MEMBERS");
        if(bUser.hasPermission("MANAGE_MESSAGES")) return errors.noW(message, "Такого пользователя нельзя за банить !");
    
        let banEmbed = new Discord.RichEmbed()
        .setDescription("**Ban**")
        .setColor("#b70000")
        .addField("Banned User", `${bUser} with ID ${bUser.id}`)
        .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
        .addField("Banned In", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reason", bReason)
        .setFooter(server_name);
    
        let incidentchannel = message.guild.channels.find(`name`, "🔧log-bots");
        if(!incidentchannel) return errors.noChannel(message, "Не возможно найти канал 🔧log-bots");
    
        message.guild.member(bUser).ban(bReason);
        incidentchannel.send(banEmbed);
    
    
        return;
    }
    */
    
    if (message.content.startsWith(p + 'report')) {
    
        if(!args[0]) return errors.noReason(message, "Укажите причину !");
        message.delete().catch(O_o => {});
        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!rUser) return errors.noReason(message, "Неудолось найти данного пользователя !");
        let rreason = args.join(" ").slice(22);
    
        let reportEmbed = new Discord.RichEmbed()
        .setDescription("Reports")
        .setColor("#b70000")
        .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
        .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
        .addField("Channel", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reason", rreason)
        .setFooter(server_name);
    
        let reportschannel = message.guild.channels.find(`name`, "🔧log-bots");
        if(!reportschannel) return errors.noReason(message, "Не возможно найти канал 🔧log-bots");
    
    
        message.delete().catch(O_o=>{});
        reportschannel.send(reportEmbed);
    
        return;
    }
    
    /* ---------- Информация ---------- */
    /* ---------- Информация ---------- */
    /* ---------- Информация ---------- */

    if (message.content.startsWith(p + 'serverinfo')) {

        message.delete().catch(O_o => {});
        let sicon = message.guild.iconURL;
        let serverembed = new Discord.RichEmbed()
        .setDescription("Информация о сервере")
        .setColor("ffd500")
        .setThumbnail(sicon)
        .addField("Server Name", message.guild.name)
        .addField("Created On", message.guild.createdAt)
        .addField("You Joined", message.member.joinedAt)
        .addField("Total Members", message.guild.memberCount)
        .setFooter(server_name);
    
        return message.channel.send(serverembed);
    }
    
    if (message.content.startsWith(p + 'botinfo')) {

        message.delete().catch(O_o => {});
        let bicon = bot.user.displayAvatarURL;
        let botembed = new Discord.RichEmbed()
        .setDescription("Информация о боте")
        .setColor("ffd500")
        .setThumbnail(bicon)
        .addField("Bot Name", bot.user.username)
        .addField("Created On", bot.user.createdAt)
        .setFooter(server_name);
    
        return message.channel.send(botembed);
    }
});

bot.login(botconfig.token);
