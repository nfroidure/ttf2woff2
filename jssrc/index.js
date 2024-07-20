import theTTFToWOFF2Module from './ttf2woff2.cjs';

export default function ttf2woff2(inputContent) {
  // Prepare input
  const inputBuffer = theTTFToWOFF2Module._malloc(inputContent.length + 1);
  const outputSizePtr = theTTFToWOFF2Module._malloc(4); // eslint-disable-line
  let outputBufferPtr;
  let outputSize;
  let outputContent;

  theTTFToWOFF2Module.writeArrayToMemory(inputContent, inputBuffer);

  // Run
  outputBufferPtr = theTTFToWOFF2Module.convert(
    inputBuffer,
    inputContent.length,
    outputSizePtr,
  );

  // Retrieve output
  outputSize = theTTFToWOFF2Module.getValue(outputSizePtr, 'i32');
  outputContent = Buffer.alloc(outputSize);

  for (let i = 0; i < outputSize; i++) {
    outputContent[i] = theTTFToWOFF2Module.getValue(outputBufferPtr + i, 'i8');
  }

  theTTFToWOFF2Module.freePtrs(outputBufferPtr, outputSizePtr);

  return outputContent;
};
