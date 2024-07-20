import { describe, test, expect, jest } from '@jest/globals';
import { readFile } from 'node:fs/promises';

describe('ttf2woff2', () => {
  test('should work from the main endpoint', async () => {
    jest.setTimeout(5000);

    const ttf2woff2 = (await import('./index.js')).default;
    const inputContent = await readFile('fixtures/iconsfont.ttf');
    const outputContent = ttf2woff2(inputContent);

    expect(outputContent.length).toEqual(1072);
    expect(outputContent[1071]).toEqual(0);
    expect(outputContent).toEqual(await readFile('fixtures/iconsfont.woff2'));
  });

  test('should work from the native build', async () => {
    const ttf2woff2 = (await import('bindings')).default('addon.node').convert;
    const inputContent = await readFile('fixtures/iconsfont.ttf');
    const outputContent = ttf2woff2(inputContent);

    expect(outputContent.length).toEqual(1072);
    expect(outputContent[1071]).toEqual(0);
    expect(outputContent).toEqual(await readFile('fixtures/iconsfont.woff2'));
  });

  test('should work from the emscripten endpoint', async () => {
    jest.setTimeout(5000);

    const ttf2woff2 = (await import('../jssrc/index.js')).default;
    const inputContent = await readFile('fixtures/iconsfont.ttf');
    const outputContent = ttf2woff2(inputContent);

    expect(outputContent.length).toEqual(1072);
    expect(outputContent[1071]).toEqual(0);
    expect(outputContent).toEqual(await readFile('fixtures/iconsfont.woff2'));
  });
});
