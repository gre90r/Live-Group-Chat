# 1 Live Group Chat
Chat Application with Java EE and the WebSocket API.
Every client who connects to the server will be connected to the same
chatroom. Anyone who connects to the server will receive the messages from all
the other clients. Anyone can write in the chat and everyone will see it.

# 2 Dependencies
* Glassfish 4.1.1 (Java EE 7)

# 3 Starting Application
There is no deploy script yet, so you can only start within NetBeans.

## 3.1 with NetBeans
install necessary plugins in NetBeans for Java and JavaEE.
* in Category "Java Web and EE" I installed
    * Java EE Base
    * EJB and EAR
    * JSF
* in Category "Java SE" I installed
    * Maven
    * Java
    
to be on the safe side, you can install all plugins from the categories
"Java Web and EE" and "Java SE" ;)

### 3.1.1 Via: Open Project
* git clone
* File > Open Project...
* navigate to the cloned folder "Live-Group-Chat"
    * if you have all needed plugins installed, it will open the project and
      detected it as Maven.
* Click "Build Project"
    * Maven builds it
* Click "Run Project"
    * this starts the GlassFish Server and will automatically open application
      in your browser

### 3.1.2 Via: New Project
* New Project
    * Maven > Web Application
    * Java EE Server > Glassfish 4.1.1
* git pull
* build application with maven
    * click the build icon in NetBeans IDE
* start application in NetBeans
    * click the start icon in NetBeans IDE
    * if it asks for a server, select GlassFish Server. If it is not listed,
      install a GlassFish server as shown below in chapter
      "adding a GlassFish Server"



## 3.2 in any other environment
* install a Glassfish Server 4.1.1
* build and package the application into a .war file
* deploy the .war file to the Glassfish Server
* enter the website's URL
    * <code>http://localhost:8080/Live-Group-Chat/</code>

## 3.3 How can other clients join
Client joins have been tested in local networks.

You, who starts the GlassFish Server, must pass your local IP address to your
other clients.

* on linux you can do in terminal
    * `ifconfig` and find your local IP address
    * I know my local IP address starts with 192, so I can search with
      `ifconfig | grep "inet 192"`
      
In my case my local IP address is 192.168.178.33. So, the address you give is
`192.168.178.33:8080/Live-Group-Chat`. Be aware, the URL is case sensitive, so
you cannot write live-group-chat. Also do not forget the port with `:8080`

# 4 adding a GlassFish Server
* download GlassFish server: http://download.oracle.com/glassfish/4.1.1/release/glassfish-4.1.1.zip
* copy the extracted "glassfish4" to where you want it to be installed
* in NetBeans: Tools > Servers > Add Server... > GlassFish Server
    * Server Location
        * for Installation Location, paste the path where you extracted glassfish4
            * mine is /home/gregor/.glassfish4
        * Local Domain
    * Domain Name/Location
        * Domain: glassfish
            * you can choose a name
        * Host: localhost
            * Loopback checked
        * DAS Port: 4848, HTTP Port: 8080, Default checked
        * Target:
            * leave this field and the other two below empty
    * wait for the pop-up "Domain creation successful"

# 5 Client-Server Communication
the JavaEE Server connects the clients together. Each time a client sends
a message the Server distributes the message to the other connected clients.
A client connects by visiting the website. In case of just a local install
it works only in a local network. the client which hosts the server connects
via <code>http://localhost:8080/Live-Group-Chat/</code> . all other clients connect
to the ip address of the client hosting the server. so e.g. it would be 
<code>http://192.168.1.104:8080/Live-Group-Chat/</code> for all other clients.

the chat is session based so each client can open multiple tabs in the browser.

### 5.1 Serialization
with json
```
message {
    "user": "Bob",
    "time": "14:53",
    "message": "hello"
}
```

### 5.2 Transportation
with websocket api. handled by Javascript on the client side. handled by Java
on the server side.

# 6 Deploy
* build the application
* start the Glassfish Server
    * this is done by starting the application in NetBeans
* when deploying make sure you are logged in into the glassfish server
    * visit: http://localhost:4848
    * deploy only works when logged in into glassfish server
        * http://localhost:4848/common/index.jsf

