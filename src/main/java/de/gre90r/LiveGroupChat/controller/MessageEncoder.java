
package de.gre90r.LiveGroupChat.controller;

import de.gre90r.LiveGroupChat.model.Message;

import javax.websocket.EncodeException;
import javax.websocket.Encoder;
import javax.websocket.EndpointConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * serialize message
 */
public class MessageEncoder implements Encoder.Text<Message> {

    private static final Logger LOG = LoggerFactory.getLogger(MessageEncoder.class);
    
    @Override
    public String encode(Message message) throws EncodeException {
        LOG.info("MessageEncoder: encode");
        return message.getJson().toString();
    }

    @Override
    public void init(EndpointConfig config) {
        LOG.info("MessageEncoder: init");
    }

    @Override
    public void destroy() {
        LOG.info("MessageEncoder: destroy");
    }
    
}
