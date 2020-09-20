var username = '';

/**
 * set and display user's name above chat history.
 * after the username is set the user can chat.
 */
function setUsername() {
    'use strict';
    
    username = document.getElementById('username').value;
    
    if (username.length > 0) {
        displayUsernameAndRemoveInputfield();
        activateSendButton();
    }
}

/**
 * enable send button so user is able to chat.
 */
function activateSendButton() {
    'use strict';
    
    let sendButton = document.getElementById('btnSend');
    sendButton.disabled = false;
}

/**
 * when user enters his name remove the input field
 * and display is name.
 */
function displayUsernameAndRemoveInputfield() {
    'use strict';
    
    removeUsernameInputField();
    createUsernameDisplayField();
}

/**
 * create the field where the username is displayed.
 */
function createUsernameDisplayField() {
    'use strict';
    
    let textnode = document.createTextNode(username);
    let node = document.createElement('P');
    node.setAttribute('class', 'username');
    node.appendChild(textnode);
    let mynameSection = document.getElementById('myname');
    mynameSection.appendChild(node);
}

/**
 * remove input field where user enters his name.
 * this is called when the user entered his name
 * and the input field is no longer necessary.
 */
function removeUsernameInputField() {
    'use strict';
    
    let usernameInputArea = document.getElementById('username-input');
    usernameInputArea.parentNode.removeChild(usernameInputArea);
}

/**
 * create a new message in the chat history
 * @param username who wrote the message
 * @param time the time when the user wrote the message
 * @param message user's message
 * @return the created article
 */
function createMessageArticle(username, time, message) {
    'use strict';
    
    // create article
    let article = document.createElement('ARTICLE');
    article.setAttribute('class', 'message');
    
    // append username & time
//    let now = new Date();
    let h3 = document.createElement('H3');
    let nameAndTime = document.createTextNode(username + ' ' + time);
    h3.appendChild(nameAndTime);
    article.appendChild(h3);
        
    // append message
    let p = document.createElement('P');
    p.setAttribute("class", "message-text");
    let messageNode = document.createTextNode(message);
    p.appendChild(messageNode);
    article.appendChild(p);
    
    return article;
}

/**
 * @todo send message via websocket to server
 * send message in textarea via websocket api to server.
 */
function sendMessage() {
    'use strict';
    
    let message = getUserMessage();    
    clearUserMessageInputField();
    
    // TODO: remove this line. when receiving a message from the server
    // invoke this line
//    let article = createMessageArticle(username, message);
    
    // !! TODO: do not add message to chat history. send it to server.
    // the server will broadcast the message to everyone. so the sender
    // itself will receive the message. when he receives the message he
    // knows the message is online and then display it in the chat history
    // to make sure all other clients see this message.
//    addMessageArticleToChatHistory(article); // TODO: remove this line later
    
    // create timestamp
    let now = new Date();
    let timestamp = now.getHours() + ':' + now.getMinutes(); 
    
    // creat json
    let json = defineMessageJson(username, timestamp, message);
    
    // send message with websocket api
    sendMessageJson(json);
    
    console.log(username + ' '+ timestamp + ' sent message: ' + message);
}

/**
 * after user sent a message clear the input field.
 */
function clearUserMessageInputField() {
    'use strict';
    
    let element = document.getElementById('usermessage');
    element.value= '';
}

/**
 * get user message from input field
 * @return user's message from textarea
 */
function getUserMessage() {
    'use strict';
    
    return document.getElementById('usermessage').value;
}

/**
 * add a fully created message article to chat history.
 * only appends article to chat history.
 * @param article the message article to append to the chat history
 */
function addMessageArticleToChatHistory(article) {
    'use strict';
    
    let chathistory = document.getElementById('chathistory');
    chathistory.appendChild(article);
}

/**
 * serialize message into json format
 * @param username client's name 
 * @param time time when the message has been written
 * @param message client's message
 * @returns message in json format
 */
function defineMessageJson(username, time, message) {
    'use strict';
    
    return JSON.stringify({
        "user": username,
        "time": time,
        "message": message
    });
}

/**
 * send message via websocket api
 * @param json user's message in json format
 */
function sendMessageJson(json) {
    'use strict';
    
    sendText(json);
}