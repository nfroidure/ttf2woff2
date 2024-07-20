import { describe, test, expect, jest } from '@jest/globals';
import { readFile } from 'node:fs/promises';

describe('Testing CLI', () => {
  test('should work', async () => {
    jest.setTimeout(5000);
    expect(
      (await import('child_process')).execSync('node ./bin/ttf2woff2.js', {
        input: await readFile('fixtures/iconsfont.ttf'),
      }),
    ).toEqual(await readFile('fixtures/iconsfont.woff2'));
  });
});
