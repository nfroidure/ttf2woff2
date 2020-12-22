import fs from 'fs';

describe('ttf2woff2', () => {
  it('should work from the main endpoint', async () => {
    jest.setTimeout(5000);
    var ttf2woff2 = require('../src/index');
    var inputContent = fs.readFileSync(__dirname + '/expected/iconsfont.ttf');
    var outputContent = ttf2woff2(inputContent);

    expect(outputContent.length).toEqual(1072);
    expect(outputContent[1071]).toEqual(0);
    expect(outputContent).toEqual(
      fs.readFileSync(__dirname + '/expected/iconsfont.woff2'),
    );
  });

  it('should work from the native build', async () => {
    var ttf2woff2 = require('bindings')('addon.node').convert;
    var inputContent = fs.readFileSync(__dirname + '/expected/iconsfont.ttf');
    var outputContent = ttf2woff2(inputContent);

    expect(outputContent.length).toEqual(1072);
    expect(outputContent[1071]).toEqual(0);
    expect(outputContent).toEqual(
      fs.readFileSync(__dirname + '/expected/iconsfont.woff2'),
    );
  });

  it('should work from the emscripten endpoint', async () => {
    jest.setTimeout(5000);
    var ttf2woff2 = require('../jssrc/index.js');
    var inputContent = fs.readFileSync(__dirname + '/expected/iconsfont.ttf');
    var outputContent = ttf2woff2(inputContent);

    expect(outputContent.length).toEqual(1072);
    expect(outputContent[1071]).toEqual(0);
    expect(outputContent).toEqual(
      fs.readFileSync(__dirname + '/expected/iconsfont.woff2'),
    );
  });
});
