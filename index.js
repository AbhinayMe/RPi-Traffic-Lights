const Gpio = require("onoff").Gpio;

const redLED = new Gpio(9, "out"); // Export GPIO09 as an output
const yellowLED = new Gpio(10, "out"); // Export GPIO10 as an output
const greenLED = new Gpio(11, "out"); // Export GPIO11 as an output

const onLED = 1;
const offLED = 0;

// Stop the LED after (howLong) seconds
const sleep = (howLong) => {
  return new Promise((resolve) => {
    setTimeout(resolve, howLong);
  });
};

const startTrafficLEDs = async () => {
  while (true) {
    // Red
    redLED.writeSync(onLED);
    await sleep(1000 * 3); // 3 seconds

    // Red and Yellow
    yellowLED.writeSync(onLED);
    await sleep(1000 * 1); // 1 second

    // Green
    redLED.writeSync(offLED);
    yellowLED.writeSync(offLED);
    greenLED.writeSync(onLED);
    await sleep(1000 * 5); // 5 seconds

    // Yellow
    greenLED.writeSync(offLED);
    yellowLED.writeSync(onLED);
    await sleep(1000 * 2); // 2 seconds

    // Yellow off
    yellowLED.writeSync(offLED);
  }
};

const offAllLEDs = () => {
  redLED.writeSync(offLED);
  yellowLED.writeSync(offLED);
  greenLED.writeSync(offLED);
};

process.on("SIGINT", () => {
  // When Ctrl+C to exit
  offAllLEDs();
  process.exit();
});

offAllLEDs();
startTrafficLEDs();
