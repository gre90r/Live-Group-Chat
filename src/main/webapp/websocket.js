/**
 * websocket sends json messages
 * 
 * template by Frank Buehler. Customized by gre90r
 */

// define websocket
var wsUri = "ws://" + document.location.host + document.location.pathname + "chatendpoint";
var websocket = new WebSocket(wsUri);
websocket.binaryType = "arraybuffer";

// display configuration
console.log("Host= " + document.location.host);
console.log("Path= " + document.location.pathname);
console.log("websocketURI= " + wsUri);

// define websocket functions
websocket.onmessage = function (evt) {
    onMessage(evt);
};
websocket.onerror = function (evt) {
    onError(evt);
};

/**
 * sending any string. in our application it will always be a json string
 * @param json json string which holds the message information
 */
function sendText(json) {
    console.log("websocket sending text: " + json);
    websocket.send(json);
}

/**
 * recives message from a client
 * @param evt the event a client triggered. json message is inside
 */
function onMessage(evt) {
    console.log("Host= " + document.location.host);
    console.log("Path= " + document.location.pathname);
    console.log("websocket received: " + evt.data);
  
    let json = JSON.parse(evt.data);
    
    // add message to chat history
    let messageArticle = createMessageArticle(json.user, json.time, json.message);
    addMessageArticleToChatHistory(messageArticle);
}

/**
 * on any message display this error message
 * @param evt the event which triggers the error
 */
function onError(evt) {
    writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
}
