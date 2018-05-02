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

  //Wemos D1 mini pins with corresponding Arduino pins
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

  // init a led on pin 2, strobe every 1000ms
  let led1 = new five.Led(d['3']);

  let leds = new five.Leds([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17])
  leds.off()
  led1.off()
  setTimeout(function () {
         led1.on();
       }, 1000)

  let led2 = new five.Led(2);
  //led1.blink(500);
  //led2.blink(750);



  // for(let i = 0; i < leds.length; i++) {
  //   setTimeout(function () {
  //     console.log(i)
  //     leds[i].on();
  //   }, 2000 * i)
  //   leds[i].off();
  // }
  // d['0']
  // setup a standard servo, center at start
  servo = new five.Servo({
    pin: d['2'],
    range: [0, 180],
    type: 'standard',
    center: true
  })

  servo.to(180)


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
