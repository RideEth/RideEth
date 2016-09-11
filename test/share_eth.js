// Useful functions

function checkAllBalances() {
    var totalBal = 0;
    for (var acctNum in eth.accounts) {
        var acct = eth.accounts[acctNum];
        var acctBal = web3.fromWei(eth.getBalance(acct), "ether");
        totalBal += parseFloat(acctBal);
        console.log("  eth.accounts[" + acctNum + "]: \t" + acct + " \tbalance: " + acctBal + " ether");
    }
    console.log("  Total balance: " + totalBal + " ether");
};

// We want 3 accounts for our tests
while (eth.accounts.length < 4) {
	console.log("Creating test account...");
	personal.newAccount(""); // Empty passphrase
}

console.log("unlock account to share eth")

personal.unlockAccount(eth.coinbase, "mypassword", 3600);

console.log("unlock other accounts")

for (i = 1; i < eth.accounts.length; i++) {
    personal.unlockAccount(eth.accounts[i], "", 3600);
}

console.log("Provisioning accounts with some eth...");

for (i = 1; i < eth.accounts.length; i++) {
	var acc = eth.accounts[i];
	if (web3.fromWei(eth.getBalance(acc), "ether") < 5) {
		eth.sendTransaction({from:eth.coinbase, to:acc, value: web3.toWei(10, "ether")})
	}
}

checkAllBalances()
