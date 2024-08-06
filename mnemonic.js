const readline = require('readline');
const bip39 = require('bip39');
const hdkey = require('ethereumjs-wallet/hdkey');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function generateAddressesFromMnemonic(mnemonic, numberOfAddresses) {
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  const hdwallet = hdkey.fromMasterSeed(seed);
  const addresses = [];

  for (let i = 0; i < numberOfAddresses; i++) {
    const wallet = hdwallet.derivePath(`m/44'/60'/0'/0/${i}`).getWallet();
    const address = wallet.getAddressString();
    const privateKey = wallet.getPrivateKeyString();
    addresses.push({ address, privateKey });
  }

  return addresses;
}

rl.question('Masukkan mnemonic: ', mnemonic => {
  rl.question('Masukkan jumlah alamat yang ingin dibuat: ', numberOfAddresses => {
    const generatedAddresses = generateAddressesFromMnemonic(mnemonic, parseInt(numberOfAddresses));

    console.log(`Alamat yang dihasilkan dari mnemonic '${mnemonic}' adalah:`);
    generatedAddresses.forEach((addressObj, index) => {
      console.log(`Alamat ${index + 1}: ${addressObj.address}`);
      console.log(`Kunci Privat: ${addressObj.privateKey}`);
      console.log('------------------');
    });

    rl.close();
  });
});
