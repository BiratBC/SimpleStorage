const ethers = require("ethers");
const fs = require("fs-extra");
const { JsonRpcProvider } = require("ethers");
require("dotenv").config();

const main = async () => {
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
  const encryptedJsonKey = await wallet.encryptSync(
    process.env.PRIVATE_KEY_PASSWORD,
    process.env.PRIVATE_KEY,
    (progress) => {
      console.log(`Encryption progress: ${Math.round(progress * 100)}%`);
    }
  );
  console.log(encryptedJsonKey);
  fs.writeFileSync("./encryptedKey.json", encryptedJsonKey);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
