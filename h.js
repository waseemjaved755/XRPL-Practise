// ************* Define HTML Form Fields as constants **************
const tn = document.getElementById("tn");
const dn = document.getElementById("dn");
const standbyResultField = document.getElementById("standbyResultField");
const operationalResultsField = document.getElementById("operationalResultField");
const standbyAccountField = document.getElementById("standbyAccountField");
const standbyPubKeyField = document.getElementById("standbyPubKeyField");
const standbyPrivKeyField = document.getElementById("standbyPrivKeyField");
const standbyBalanceField = document.getElementById("standbyBalanceField");
const standbySeedField = document.getElementById("standbySeedField");
// ************* Get the Preferred Network **************
function getNet() {
  let net;
  if (tn.checked) net = "wss://s.altnet.rippletest.net:51233";
  if (dn.checked) net = "wss://s.devnet.rippletest.net:51233";
  return net;
} // End of getNet()

// ************* Get Account *****************************
async function getAccount(type) {
  let net = getNet();

  const client = new xrpl.Client(net);
  results = "Connecting to " + net + "....<br/>";

  // This uses the default faucet for Testnet/Devnet
  let faucetHost = null;
  let amount = '930';
  if (type == "standby") {
    standbyResultField.innerHTML = results;
  } else {
    operationalResultField.innerHTML = results;
  }
  await client.connect();

  results += "\nConnected, funding wallet.<br/>";
  if (type == "standby") {
    standbyResultField.innerHTML = results;
  } else {
    operationalResultField.innerHTML = results;
  }

  // -----------------------------------Create and fund a test account wallet
  const my_wallet = (await client.fundWallet(null, {amount, faucetHost })).wallet;

  results += "\nGot a wallet.<br/>";
  if (type == "standby") {
    standbyResultField.innerHTML = results;
  } else {
    operationalResultField.innerHTML = results;
  }

  // -----------------------------------Get the current balance.
  const my_balance = await client.getXrpBalance(my_wallet.address);

  if (type == "standby") {
    standbyAccountField.innerHTML = my_wallet.address;
    standbyPubKeyField.innerHTML = my_wallet.publicKey;
    standbyPrivKeyField.innerHTML = my_wallet.privateKey;
    standbyBalanceField.innerHTML = await client.getXrpBalance(
      my_wallet.address
    );
    standbySeedField.innerHTML = my_wallet.seed;
    results += "\nStandby account created.<br/>";
    standbyResultField.innerHTML = results;
  } else {
    operationalAccountField.innerHTML = my_wallet.address;
    operationalPubKeyField.innerHTML = my_wallet.publicKey;
    operationalPrivKeyField.innerHTML = my_wallet.privateKey;
    operationalSeedField.innerHTML = my_wallet.seed;
    operationalBalanceField.innerHTML = await client.getXrpBalance(
      my_wallet.address
    );
    results += "\nOperational account created.<br/>";
    operationalResultField.innerHTML = results;
  }
 
  client.disconnect();
} // End of getAccount()
