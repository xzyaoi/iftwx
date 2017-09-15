from model import Channel

def add_follower(openId,channelId):
    channel = Channel.Query.get(objectId=channelId)
    followers = channel.follower
    if(openId not in followers):
        followers.append(openId)
        channel.follower = followers
        channel.save()
    return channel.name