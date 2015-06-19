var theTTFToWOFF2Module = require('../build/ttf2woff2');

module.exports = function ttf2woff2(inputContent) {

  // Prepare input
  var inputBuffer = theTTFToWOFF2Module._malloc(inputContent.length + 1);
  var outputSizePtr = theTTFToWOFF2Module._malloc(4);
  theTTFToWOFF2Module.writeArrayToMemory(inputContent, inputBuffer);

  // Run
  var outputBufferPtr = theTTFToWOFF2Module._TTFToWOFF2(inputBuffer, inputContent.length + 1, outputSizePtr);

  // Retrieve output
  var outputSize = theTTFToWOFF2Module.getValue(outputSizePtr, 'i32');
  var outputContent = new Buffer(outputSize);

  for(var i = 0; i < outputSize; i++ ) {
    outputContent[i] = theTTFToWOFF2Module.getValue(outputBufferPtr + i, 'i8');
  }
  
  return outputContent;
}

