'use strict';

var theTTFToWOFF2Module = require('./ttf2woff2');

module.exports = function ttf2woff2(inputContent) {
  var outputSize;
  var outputContent;
  var outputBufferPtr;
  var i;

  // Prepare input
  var inputBuffer = theTTFToWOFF2Module._malloc(inputContent.length + 1);
  var outputSizePtr = theTTFToWOFF2Module._malloc(4);

  theTTFToWOFF2Module.writeArrayToMemory(inputContent, inputBuffer);

  // Run
  outputBufferPtr = theTTFToWOFF2Module._convertTTFToWOFF2(
    inputBuffer, inputContent.length + 1, outputSizePtr
  );

  // Retrieve output
  outputSize = theTTFToWOFF2Module.getValue(outputSizePtr, 'i32');
  outputContent = new Buffer(outputSize);

  for(i = 0; i < outputSize; i++) {
    outputContent[i] = theTTFToWOFF2Module.getValue(outputBufferPtr + i, 'i8');
  }

  theTTFToWOFF2Module._free(inputBuffer);
  theTTFToWOFF2Module._free(outputSizePtr);
  theTTFToWOFF2Module._freeTTFToWOFF2(outputBufferPtr);

  return outputContent;
};
