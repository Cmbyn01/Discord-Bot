require('dotenv').config();

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    partials: ['MESSAGE','REACTION'] 

}); 
const PREFIX = "~";

client.on('ready', ()=>{
    console.log(`${client.user.tag} has logged in!`);
})

client.on('messageCreate', (message)=>{
if(message.author.bot) return;
if(message.content.startsWith(PREFIX)){
const [CMD_NAME,...args] = message.content.trim().substring(PREFIX.length).split(/\s+/);

if(CMD_NAME === 'kick')
{
    if(!message.member.permissions.has('KICK_MEMBERS'))
    return message.reply('You do not have permission to use that command');
    if(args.length === 0)
    {
        return message.reply('Please provide an ID');
    } 
    const member = message.guild.members.cache.get(args[0]);
   if(member)
   {
    member.kick()
    .then((member)=>message.channel.send(`${member} was kicked`))
    .catch((err)=>message.channel.send('I do not have permission'));
   } else
   {
    message.channel.send('that member not found');
   }
} 
else
   if(CMD_NAME==='ban')
   {
    if(!message.member.permissions.has('BAN_MEMBERS'))
    return message.reply('You do not have permission to use that command');
    if(args.length === 0)
    {
        return message.reply('Please provide an ID');
    }
    message.guild.members.ban(args[0]).catch((err)=> console.log(err));
   }
}

});

client.on('messageReactionAdd',async (reaction,user)=>{
    console.log('Hello!');
    const { name } = reaction.emoji.name;
    const member = reaction.message.guild.members.cache.get(user.id);
    if(reaction.message.id==='993536665576558683') {
        switch(name)
        {
            case '🍒' : message.member.addRole('993536349405712394');
            break;
            case '🍎': message.member.addRole('993536428027944970');
            break;
            case '🍑': message.member.addRole('993536470365241404');
            break;    
        }

    }
});





client.login(process.env.DISCORDJS_BOT_TOKEN);
