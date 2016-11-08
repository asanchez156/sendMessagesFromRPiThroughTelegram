# sendMessagesFromRPiThrowTelegram

Welcome to RPi telegram!

This is an App which can send message thanks to Raspberry Pi. This app connects with a server (RPi apache) which has a Telegram client with sends the messages to the user you set to.

The apache server recives a request with the user and the message it has to send. Then, the message is sent thanks to a python script which calls to the telegram client and if the user is on his contact list, it sends the message to that user.
  
