 wscat -c "wss://xxxxxxxxx.execute-api.ap-southeast-2.amazonaws.com/production"
Connected (press CTRL+C to quit)
> {"action":"join","name":"Rose"}
< {"members":["Rose"]}
< {"systemMessage":"Rose has joined the chat"}
< {"members":["Rose","Jessica"]}
< {"systemMessage":"Jessica has joined the chat"}
> {"action":"sendPublic","message":"Hi All"}
< {"publicMessage":"Rose says: Hi All"}
< {"privateMessage":"Jessica says: hi Rose"}
< {"members":["Rose","Jessica","David"]}
< {"systemMessage":"David has joined the chat"}
>


 wscat -c "wss://xxxxxxxxx.execute-api.ap-southeast-2.amazonaws.com/production"
Connected (press CTRL+C to quit)
> {"action":"join","name":"Jessica"}
< {"members":["Rose","Jessica"]}
< {"systemMessage":"Jessica has joined the chat"}
< {"publicMessage":"Rose says: Hi All"}
> {"action":"sendPrivate","message":"hi Rose", "to":"Rose"}
< {"members":["Rose","Jessica","David"]}
< {"systemMessage":"David has joined the chat"}
> {"action":"sendPrivate","message":"hi David", "to":"David"}
>




 wscat -c "wss://xxxxxxxxx.execute-api.ap-southeast-2.amazonaws.com/production"
Connected (press CTRL+C to quit)
> {"action":"join","name":"David"}
< {"members":["Rose","Jessica","David"]}
< {"systemMessage":"David has joined the chat"}
< {"privateMessage":"Jessica says: hi David"}
>



# SIMPLE-CHAT-NODEJS
