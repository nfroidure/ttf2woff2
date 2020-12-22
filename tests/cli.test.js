import fs from 'fs';

describe('Testing CLI', () => {
  it('should work', async () => {
    jest.setTimeout(5000);
    expect(
      require('child_process').execSync(
        'node ' + __dirname + '/../bin/ttf2woff2.js',
        {
          input: fs.readFileSync(__dirname + '/expected/iconsfont.ttf'),
        },
      ),
    ).toEqual(fs.readFileSync(__dirname + '/expected/iconsfont.woff2'));
  });
});
