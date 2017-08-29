from wxpy import *


bot = Bot()
bot.enable_puid()

@bot.register()
def print_others(msg):
    print(msg)