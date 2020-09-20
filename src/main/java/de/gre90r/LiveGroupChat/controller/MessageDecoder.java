
package de.gre90r.LiveGroupChat.controller;

import de.gre90r.LiveGroupChat.model.Message;

import java.io.StringReader;
import javax.json.Json;
import javax.json.JsonException;
import javax.json.JsonObject;
import javax.websocket.DecodeException;
import javax.websocket.Decoder;
import javax.websocket.EndpointConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * de-serialize message
 */
public class MessageDecoder implements Decoder.Text<Message> {

    private static final Logger LOG = LoggerFactory.getLogger(MessageDecoder.class);
    
    @Override
    public Message decode(String string) throws DecodeException {
        LOG.info("MessageDecoder: decode: " + string);
        JsonObject jsonObject = Json.createReader(new StringReader(string)).readObject();
        return new Message(jsonObject);
    }

    @Override
    public boolean willDecode(String string) {
        try {
            Json.createReader(new StringReader(string)).readObject();
            return true;
        } catch (JsonException ex) {
            ex.printStackTrace();
            return false;
        }
    }

    @Override
    public void init(EndpointConfig config) {
        LOG.info("MessageDecoder: init");
    }

    @Override
    public void destroy() {
        LOG.info("MessageDecoder: destroy");
    }
    
}
