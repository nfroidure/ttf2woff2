import { describe, test, expect, jest } from '@jest/globals';
import { readFile } from 'node:fs/promises';
import { YError } from 'yerror';

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

  test('should well fail from the native build', async () => {
    const ttf2woff2 = (await import('bindings')).default('addon.node').convert;
    const inputContent = Buffer.alloc(2 ** 32, 0xff);

    try {
      ttf2woff2(inputContent);
      throw new YError('E_UNEXPECTED_SUCCESS');
    } catch (err) {
      expect(err).toMatchInlineSnapshot(`[Error: E_CONVERT_ERROR]`);
    }
  });

  test('should work from the Emscripten endpoint', async () => {
    jest.setTimeout(5000);

    const ttf2woff2 = (await import('../jssrc/index.js')).default;
    const inputContent = await readFile('fixtures/iconsfont.ttf');
    const outputContent = ttf2woff2(inputContent);

    expect(outputContent.length).toEqual(1072);
    expect(outputContent[1071]).toEqual(0);
    expect(outputContent).toEqual(await readFile('fixtures/iconsfont.woff2'));
  });

  test('should well fail from the Emscripten build', async () => {
    jest.setTimeout(5000);

    const ttf2woff2 = (await import('../jssrc/index.js')).default;
    const inputContent = Buffer.alloc(512, 0xff);

    try {
      ttf2woff2(inputContent);
      throw new YError('E_UNEXPECTED_SUCCESS');
    } catch (err) {
      expect(err).toMatchInlineSnapshot(`[YError: E_CONVERT_ERROR (): E_CONVERT_ERROR]`);
    }
  });
});
