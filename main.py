import discord
import config

class MyClient(discord.Client):
    async def on_ready(self):
        print('Logged on as {0}!'.format(self.user))

    async def on_message(self, message):
        if message.content == '!ola':
            await message.channel.send(f"Olá! {message.author.name}")
    
    async def on_member_join(self, member):
        guild = member.guild
        
        if guild.system_channel is not None:
            message = f"{member.mention} acabou de entrar no {guild.name}"
            await guild.system_channel.send(message)

intents = discord.Intents.default()
intents.members = True

client = MyClient(intents=intents)
client.run(config.TOKEN)