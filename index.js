const botconfig = require("./botconfig.json");
const tokenfile = require("./token.json");
const Discord = require('discord.js');
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f =>f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
   });

});


bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);

  bot.user.setActivity("Inchy Core Full Launched v3.0", {type: "PLAYING"});



  //bot.user.setActivity("on Atom");
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

  if (cmd === `${prefix}kick`){

//!kick @user Asking
     let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
     if(!kUser) return message.channel.send("Couldn't find user.");
     let kReason = args.join(" ").slice(22);
     if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!");
     if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

     let kickEmbed = new Discord.RichEmbed()
     .setDescription("~kick~")
     .setColor("#e5b00")
     .addField("Kicker User", `${kUser} with ID ${kUser.id}`)
     .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
     .addField("Kicked In", message.channel)
     .addField("Time", message.channel)
     .addField("Reason", kReason);

     let kickChannel = message.channel.find("name", "incidents");
     if(!kickChannel) return message.channel.send("Can't find incidents channel");

     massage.guild.member(kUser).kick(kReason);
     kickChannel.send(kickEmbed);

    return;
  }
  if (message.content === '!help') {
  let sicon = message.guild.iconURL;
  let helpembed = new Discord.RichEmbed()
  .setDescription("~Komande~")
  message.channel.send("``!ban``")
  message.channel.send("``!botinfo``",)
  message.channel.send("``!clear``",)
  message.channel.send("``!say``",)
  message.channel.send("``!coins``",)
  message.channel.send("``!userinfo``",)
  message.channel.send("``!warn``",)
  message.channel.send("``!warnlevel``",)
  message.channel.send("``!kick``",)
  message.channel.send("``!level``",)
  message.channel.send("``!pay``",)
  message.channel.send("``!prefix``",)
  message.channel.send("``!removerole``",)
  message.channel.send("``!report``",)
  message.channel.send("``!serverinfo``",)
}
});

if(cmd === `${prefix}ban`){

  //!ban @user Asking
       let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
       if(!bUser) return message.channel.send("Couldn't find user.");
       let bReason = args.join(" ").slice(22);
       if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("No can do pal!");
       if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

       let banEmbed = new Discord.RichEmbed()
       .setDescription("~ban~")
       .setColor("##bc000")
       .addField("Banned User", `${bUser} with ID ${bUser.id}`)
       .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
       .addField("Banned In", message.channel)
       .addField("Time", message.channel)
       .addField("Reason", bReason);

       let incidentchannel = message.channel.find("name", "incidents");
       if(!incidentChannel) return message.channel.send("Can't find incidents channel");

       message.guild.member(bUser).ban(bReason);
       incidentchannel.send(banEmbed);

      return;
    }



  if(cmd === `${prefix}serverinfo`){

    let sicon = message.guild.IconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Server Information")
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name)
    .addField("Created On", message.guild.createdAt)
    .addField("You Joined", message.member.joinedAt)
    .addField("Total Members", message.guild.memberCount);

    return message.channel.send(serverembed);
  }

  if(cmd === `${prefix}botinfo`){
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("Bot Information")
    .setColor("#15f153")
    .setThumbnail(bicon)
    .addField("Bot Name", bot.user.username)
    .adField("Created On", bot.user.createdAt);

    return message.channel.send(botembed);
  }

});

bot.login(tokenfile.token);
