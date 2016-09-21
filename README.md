# json-to-web-audio

json-to-web-audio allows you to specify oscillators and filters as JSON, and it will automatically create the necessary Web audio api nodes and filters, and link them together, and send the result to your spreakers.

You can specify any standard web audio filters, and it also includes support for the wonderful link to the wonderful [TunaJS](https://github.com/Theodeus/tuna) filters..

To install:

     npm install json-to-web-audio
     
 From here you can run your own server on the /demo folder, or you can run the built in server with:
 
     npm start


The demo plays the below:

      nodeVoiceConfig = {
        audioNodes : [
            {
                type: 'oscillator',
                props: {
                    type: "sine",
                    pipeLength: 32,
                    gain: 100,
                    filter: 1000,
                    tuning: 0
                }
            },
            {
                type: 'oscillator',
                props: {
                    type: "sine",
                    pipeLength: 8,
                    gain: 100,
                    filter: 1000,
                    tuning: 700
                }
            },
            {
                type: 'filter',
                props: {
                    type: "lowpass",
                    value: 1000
                }
            },
            {
                type: 'filter',
                tunaType: 'Chorus',
                props: {
                    rate: 1.5,
                    feedback: 0.2,
                    delay: 0.0045,
                    bypass: 0
                }
            },
            {
                type: 'filter',
                tunaType: "Delay",
                props: {
                    feedback: 0.45
                    delayTime: 150,
                    wetLevel: 0.25,
                    dryLevel: 1,
                    cutoff: 2000,
                    bypass: 0
                }
            },
            {
                type: 'filter',
                tunaType: "Phaser",
                props: {
                    rate: 1.2,
                    depth: 0.3,
                    feedback: 0.2,
                    stereoPhase: 30,
                    baseModulationFrequency: 700,
                    bypass: 0
                }
            }
        ],

        gain: 100

    };
    
