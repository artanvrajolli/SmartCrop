
import * as tf from 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@3.9.0/dist/tf.min.js';
import 'https://cdn.jsdelivr.net/npm/@tensorflow-models/coco-ssd';


var loadedModel = null;

cocoSsd.load(
    {base:"mobilenet_v2"}
).then(model => {
    loadedModel = model;
    if(eventQueue.length > 0){
        process();
    }
}).catch(err => {
    postMessage({
        type: 'detectObjects',
        status: 'error',
    });
});


var eventQueue = [];
function process(e){
    if(!e && eventQueue.length){
        e = eventQueue.shift();
    }


    const {type} = e?.data ?? {type:'none'};
    switch(type){
      case 'ping':
          console.log('---[Worker MODEL Alive]---');
      break;
      case 'detectObjects':
          if(!loadedModel){
                eventQueue.push(e);
                return;
          }
          
          loadedModel.detect(e.data.image,80,0.4).then(predictions => {
              postMessage({
                  type: 'detectObjects',
                  status: 'success',
                  predictions,
              });
          });
      break;
      default:
          console.log('Unknown message type', type);
    }
    if(eventQueue.length){
        process();
    }
};






onmessage = process;