var EtherPortClient = require('etherport-client').EtherPortClient
var five = require('johnny-five')
var board, led

board = new five.Board({
  port: new EtherPortClient({
    host: '192.168.43.167', // #TODO update esp device ip
    port: 3030
  }),
  timeout: 1e5,
  repl: false
})

board.on('ready', function () {
  console.log('READY!')

  // init a led on pin 2, strobe every 1000ms
  let led1 = new five.Led(1)
  let led2 = new five.Led(2);
  //led1.blink(500);
  //led2.blink(750);

  let leds = new five.Leds([0,1,2,3,4,5,6,7,8])
  leds.off()

  for(let i = 0; i < leds.length; i++) {
    setTimeout(function () {
      console.log(i)
      leds[i].on();
    }, 5000 * i)
    leds[i].off();
  }
  // setup a standard servo, center at start
  servo = new five.Servo({
    pin: 6,
    range: [0, 180],
    type: 'standard',
    center: true
  })

  servo.to(10)


  // poll this sensor every second
  /* sensor = new five.Sensor({
     pin: "A0",
     freq: 1000
   });*/
})

var socket = require('socket.io-client')('http://192.168.43.177:8080') // #TODO update server ip
socket.on('news', function (data) {
  console.log(data)
})

socket.on('ledSignal', function (data) {
  console.log(data)
  if (board.isReady) {
    //led.strobe(data.delay);
  }
})
socket.on('servo', function (data) {
  console.log(data)
  if (board.isReady) {
    //led.strobe(data.delay);
  }
})
