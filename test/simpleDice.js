function DelayPromise(delay) {
  //return a function that accepts a single variable
  return function(data) {
    //this function returns a promise.
    return new Promise(function(resolve, reject) {
      setTimeout(function() {
        //a promise that is resolved after "delay" milliseconds with the data provided
        resolve(data);
      }, delay);
    });
  }
}

contract('SimpleDice', function(accounts) {

  var accounts = web3.eth.accounts;
  var factory = accounts[0]
  var driver = accounts[1]
  var alice = accounts[2]
  var bob = accounts[3]

  it("should get the price", function(done) {
    SimpleDice.new({
      from: factory
    }).then(pf => pf.ETHUSD()).then(eusd => {
      setInterval(() => pf.ETHUSD().then(eusd => console.log(eusd)))
    })
  })
});