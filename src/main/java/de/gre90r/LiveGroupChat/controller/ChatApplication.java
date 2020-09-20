/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package de.gre90r.LiveGroupChat.controller;

import de.gre90r.LiveGroupChat.model.Message;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import javax.websocket.EncodeException;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * websocket server
 * @author gregor
 */
@ServerEndpoint(value = "/chatendpoint",
        encoders = {MessageEncoder.class},
        decoders = {MessageDecoder.class})
public class ChatApplication {

    private static Set<Session> peers = Collections.synchronizedSet(new HashSet<Session>());
    private final Logger LOG = LoggerFactory.getLogger(ChatApplication.class);
    
    /**
     * websocket event when client wants to connect to chat
     * @param peer client session
     */
    @OnOpen
    public void onOpen(Session peer) {
        peers.add(peer);
        LOG.info("websocket: added client: " + peer.getId());
    }
    
    /**
     * websocket event when client wants to disconnect from chat
     * @param peer client session
     */
    @OnClose
    public void onClose(Session peer) {
        peers.remove(peer);
        LOG.info("websocket: removed client: " + peer.toString());
    }

    /**
     * websocket event when server receives message from client that needs
     * to be broadcasted to the other clients (peers)
     * @param message message to broadcast
     * @param session client
     * @throws IOException
     * @throws EncodeException 
     */
    @OnMessage
    public void broadcastMessage(Message message, Session session) throws IOException, EncodeException {
        LOG.info("websocket broadcast message: " + message);
        for (Session peer : peers) {
            LOG.info("broadcast to: " + peer.getId());
            peer.getBasicRemote().sendObject(message);
        }
    }

    /**
     * websocket event when server receives binary message from client that
     * needs to be broadcasted to the other clients (peers)
     * @param data binary message to broadcast
     * @param session client
     * @throws IOException
     */
    @OnMessage
    public void broadcastBinary(ByteBuffer data, Session session) throws IOException {
        LOG.info("websocket broadcast binary: " + data);
        for (Session peer : peers) {
            if (!peer.equals(session)) {
                peer.getBasicRemote().sendBinary(data);
            }
        }
    }
    
}