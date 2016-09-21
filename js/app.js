"use strict";

import { Voice } from './Voice';

const context = new AudioContext();

const nodeVoiceConfig = {
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
                feedback: 0.45,    //0 to 1+
                delayTime: 150,    //1 to 10000 milliseconds
                wetLevel: 0.25,    //0 to 1+
                dryLevel: 1,       //0 to 1+
                cutoff: 2000,      //cutoff frequency of the built in lowpass-filter. 20 to 22050
                bypass: 0
            }
        },
        {
            type: 'filter',
            tunaType: "Phaser",
            props: {
                rate: 1.2,                     //0.01 to 8 is a decent range, but higher values are possible
                depth: 0.3,                    //0 to 1
                feedback: 0.2,                 //0 to 1+
                stereoPhase: 30,               //0 to 180
                baseModulationFrequency: 700,  //500 to 1500
                bypass: 0
            }
        }
    ],

    gain: 100

};

let oscillators = nodeVoiceConfig.audioNodes.filter((audioNode) => {
    return audioNode.type === 'oscillator';
}).map(osc => (osc.props));

let filters = nodeVoiceConfig.audioNodes.filter((audioNode) => {
    return audioNode.type === 'filter';
});


const voiceConfig = {
    oscillators : [
        oscillators[0],
        oscillators[1]
    ],
    gain: 100,
    //filter: 1000
    filters: filters/*,
     tunaFilters: [
     {
     type: 'Chorus',
     settings: {
     rate: 1.5,
     feedback: 0.2,
     delay: 0.0045,
     bypass: 0
     }
     }
     ]
     */
};
let voice = Voice(context, voiceConfig);

var masterVca = voice.setupOscillators();
let filterInput = voice.setUpFilters(voiceConfig.filters, masterVca, context.destination);

voice.playVoice();




/*const octave = () => ({
    applyPipeLength: (frequency, pipeLength) => {
        return frequency / (parseInt(pipeLength, 10) / 8);
    }
});*/

/*

 const vca = (audioContext, voiceConfig) => {

 let masterVca = audioContext.createGain();
 masterVca.gain.value = voiceConfig.gain  / 100;

 const me = {
 connectInputToVca: (node) => {
 node.connect(masterVca);
 },
 connectVcaToOutput: (node) => {
 vca.connect(node);
 }
 }
 return me

 };
 */

/*const audioNodes = (audioContext, voiceConfig) => {

 let masterVca = audioContext.createGain();
 masterVca.gain.value = voiceConfig.gain  / 100;

 const me = {

 createNodes(nodeConfigs)
 {
 let nodes = [];
 let oscillators = nodeConfigs.filter(nodeConfig => {
 return nodeConfig.type == 'oscillator';
 });

 oscillators.forEach(() => {
 nodes = createOscillator(nodeConfig);
 });

 debugger

 /*
 audioNodesConfigs.forEach(nodeConfig => {
 if(nodeConfig.type == 'oscillator')
 {
 nodes.push(me.createOscillator(nodeConfig));
 }
 else if()

 })
 * /
//me.connectVcaToOutput(output);
return masterVca;
},

connectInputToVca: (node) => {
    node.connect(masterVca);
},
    connectVcaToOutput: (node) => {
    vca.connect(node);
}
}
return me

};
*/