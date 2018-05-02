# WeMos D1 Web Control Panel 
## using Johnny Five and Socket.IO
* [WeMos D1](http://www.wemos.cc/Products/d1.html)
* [Johnny Five](http://johnny-five.io/)
* [Socket.IO](http://socket.io/) + [Socket.IO - Node.js Client](https://github.com/socketio/socket.io-client)

## Requirements
run npm install

Install nodeJS. Then add the wemos d1 mini to the arduino software : 
Follow the instructions [here](https://github.com/esp8266/Arduino)

Next upload the fimata wifi firmare to the D1 mini, instructions [here](https://projetsdiy.fr/esp8266-johnny-five-blynk-firmata-wifi/#Installer_le_firmware_StandardFirmataWiFi_sur_l8217ESP8266)

If everything was done well, you can check simple J5 code (remember to install dependencies by using command `npm install johnny-five etherport-client --save`):
```javascript
var five = require("johnny-five");
var EtherPortClient = require("etherport-client").EtherPortClient;
// update host to the IP address for your ESP board
var board = new five.Board({
    port: new EtherPortClient({
        host: "10.0.0.17", // #TODO UPDATE!
        port: 3030
    }),
    timeout: 1e5,
    repl: false
});

//Corresponding pins on the wemos d1 mini and the johnny five library
//Instead of selecting the pin like five.Led(2) to use the pin D2 ont the mini
//you can select the correct pin with five.Led(d['2'])
  let d = {
    0: 1,
    1: 5,
    2: 4,
    3: 0,
    4: 2,
    5: 14,
    6: 12,
    7: 13,
    8: 15,
  }

board.on("ready", function() {
    console.log("READY!");
    var led = new five.Led(2);
    led.blink(500);
});
````



Now you can try [code examples for Johhny Five](http://johnny-five.io/examples/).

In opposite to Johhny Five, you can check [Breakout](https://github.com/soundanalogous/Breakout).

## Build
Run `npm install` to install packages.

Start `server/server.js` on your server machine (command `node server/server.js`).

Update ESP device and server IP in `device/client.js` file and start client (command `node device/client.js`).

## Links
* [ESP8266 Firmata Issue on Github](https://github.com/firmata/arduino/issues/257)
* [etherport-client](https://github.com/mwittig/etherport-client) - Client-side virtual serial port for Rick Waldron's Etherport. Etherport-client is used to implement firmata-compatible boards and tethering hubs to control a board by a remote entity.
* [Arduino Uno Example](http://wifinodebot.blogspot.com.co/2016/02/blink-led-over-wifi-with-nodejs-johnny.html)
* [Javascript robotics and browser-based Arduino control](http://www.instructables.com/id/Javascript-robotics-and-browser-based-Arduino-cont/)
