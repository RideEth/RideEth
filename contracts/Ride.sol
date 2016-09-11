import "usingOraclize.sol";

contract Ride is usingOraclize {
    address public driver;
    
    mapping(address=>bool) isPassenger;
    address[2] public passengers;
    
    uint nbPassengers;

    string public rslt;

    bytes32 public initialRequestId;

    mapping(address=>uint) public allowance;
    
    uint public from;
    uint public to;

    // times
    uint public estimatedArrival;

    uint MAX_PASSENGERS = 2;
    uint PASSENGER_COMMITMENT = 2 ether;
    uint DRIVER_COMMITMENT = 2 ether;

    enum State {Joining, Full, Driving, ChallengeAccepted}

    event StartRideCallback();
    event ChallengeCallback();
    
    State public state = State.Joining;
    
    modifier inState(State _state) {
        if(state != _state) throw;
        _
    }
    
    modifier onlyPassengers() {
        if(!isPassenger[msg.sender]) throw;
        _
    }

    function Ride(uint _from, uint _to, address _driver) {
        if(msg.value != DRIVER_COMMITMENT) throw;
        driver = _driver;
        from = _from;
        to = _to;
    }
    
    function joinRide() inState(State.Joining) {
        if(msg.value != PASSENGER_COMMITMENT) throw;
        if(isPassenger[msg.sender]) throw;
        isPassenger[msg.sender] = true;
        passengers[nbPassengers] = msg.sender;
        allowance[msg.sender] = msg.value;
        nbPassengers++;
        if(nbPassengers == MAX_PASSENGERS) {
            state = State.Full;
        }
    }
    
    function acceptChallenge() internal {
        // reallocate funds
        for(uint i = 0; i < nbPassengers; i++) {
            allowance[passengers[i]] += allowance[driver] / nbPassengers;
        }
        allowance[driver] = 0;
        state = State.ChallengeAccepted;
    }

    function startRide(uint position) inState(State.Full) {
        initialRequestId = oraclize_query(0, "URL", "json(https://mockbin.org/bin/34ba6dec-5c62-4f4e-a273-526f78d17455).arrival");
    }
    
    function challenge(uint position) onlyPassengers() inState(State.Driving) {
        oraclize_query("URL", "json(https://mockbin.org/bin/e769b929-cf8a-42bd-a850-9e8fd34cfd51).arrival");  
    }

    function __callback(bytes32 myid, string result) {
        if (msg.sender != oraclize_cbAddress()) throw;
        rslt = "heyyyy";
        if(myid == initialRequestId) {
            StartRideCallback();
            state = State.Driving;
            estimatedArrival = parseInt(result); // save it as $ cents
        } else {
            ChallengeCallback();
            uint updatedArrival = parseInt(result);
            if(updatedArrival < estimatedArrival) {
                // Challenge successful!
                acceptChallenge();
            } 
        }    
    }
    
    function withdraw() {
        if(state != State.ChallengeAccepted || now < estimatedArrival) throw;
        if(allowance[msg.sender] > 0) {
            uint withdrawAmount = allowance[msg.sender];
            allowance[msg.sender] = 0;
            if(!msg.sender.send(withdrawAmount)) {
                allowance[msg.sender] = withdrawAmount;
            }
        } 
    }
}