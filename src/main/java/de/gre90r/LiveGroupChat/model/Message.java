
package de.gre90r.LiveGroupChat.model;

import java.io.StringWriter;
import javax.json.Json;
import javax.json.JsonObject;

/**
 * define message object. it's only json.
 */
public class Message {
    
    /**
     * json object holds all message data
     */
    private JsonObject json;
    
    public Message() {        
    }
    
    @Override
    public String toString() {
        StringWriter writer = new StringWriter();
        Json.createWriter(writer).write(json);
        return writer.toString();
    }

    public Message(JsonObject json) {
        this.json = json;
    }

    public JsonObject getJson() {
        return json;
    }

    public void setJson(JsonObject json) {
        this.json = json;
    }
}
