contract Ride {
    address public driver;
    
    mapping(address=>bool) isPassenger;
    address[2] public passengers;
    
    uint nbPassengers;

    mapping(address=>uint) allowance;
    
    uint public from;
    uint public to;

    // times
    uint public estimatedArrival;

    uint MAX_PASSENGERS = 2;
    uint PASSENGER_COMMITMENT = 1 ether;

    enum State {Joining, Full, Driving, ChallengeAccepted}
    
    State state = State.Joining;
    
    modifier inState(State _state) {
        if(state != _state) throw;
        _
    }
    
    modifier onlyPassengers() {
        if(!isPassenger[msg.sender])
        _
    }

    function Ride(uint _from, uint _to, address _driver) {
        if(msg.value != 1 ether) throw;
        driver = _driver;
        from = _from;
        to = _to;
    }
    
    function joinRide() inState(State.Joining) {
        if(msg.value != PASSENGER_COMMITMENT) throw;
        if(isPassenger[msg.sender]) throw;
        isPassenger[msg.sender] = true;
        passengers[nbPassengers] = msg.sender;
        nbPassengers++;
        if(passengers.length == MAX_PASSENGERS) {
            state = State.Full;
        }
    }
    
    function startRide(uint position) inState(State.Full) {
        state = State.Driving;
        estimatedArrival = now + 6 hours; // to be set asynchronously by oraclize
    }
    
    function acceptChallenge() internal {
        // reallocate funds
        for(uint i = 0; i < passengers.length; i++) {
            allowance[passengers[i]] += allowance[driver]/passengers.length;
        }
        allowance[driver] = 0;
        state = State.ChallengeAccepted;
    }
    
    function challenge(uint position) onlyPassengers() inState(State.Driving) {
        uint updatedArrival = now + 1 hours;
        if(updatedArrival < estimatedArrival) {
            // Challenge successful!
            acceptChallenge();
        } 
    }
    
    function withdraw() {
        if(state != State.ChallengeAccepted || now < estimatedArrival) throw;
        if(allowance[msg.sender] > 0) {
            uint withdrawAmount = allowance[msg.sender];
            allowance[msg.sender] = 0;
            msg.sender.send(withdrawAmount);
        } 
    }
}