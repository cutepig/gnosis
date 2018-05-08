const fs = require('fs');

const tachyonsGenerator = require('tachyons-generator');
const config = require('./css-config.json');

const generate = async () => {
  const tachy = tachyonsGenerator(config);

  const out = await tachy.generate();

  // NOTE: assumes it is run from the root/package.json
  fs.writeFileSync('docs/styles.html', out.docs);
  fs.writeFileSync('src/index.css', out.css);
  // fs.writeFileSync('tachyons.min.css', out.min);
};

generate();
