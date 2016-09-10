contract Ride {
    address public driver;
    
    mapping(address=>bool) isPassenger;
    mapping(address=>uint) allowance;
    
    uint public from;
    uint public to;
    uint nbPassengers;
    
    uint public estimatedArrival;
    
    uint MAX_PASSENGERS = 2;
    uint DRIVER_COMMITMENT = 1 ether;
    uint PASSENGER_COMMITMENT = 1 ether;

    enum State {Joining, Full, Driving, Closed}
    
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
        if(msg.value != DRIVER_COMMITMENT) throw;
        driver = _driver;
        from = _from;
        to = _to;
    }
    
    function joinRide() inState(State.Joining) {
        if(msg.value != PASSENGER_COMMITMENT) throw;
        if(isPassenger[msg.sender]) throw;
        isPassenger[msg.sender] = true;
        nbPassengers++;
        if(nbPassengers == MAX_PASSENGERS) {
            state = State.Full;
        }
    }
    
    function startRide(uint position) inState(State.Full) {
        state = State.Driving;
        estimatedArrival = now + 6 hours; // to be set asynchronously by oraclize
    }
    
    function acceptChallenge() internal {
        // ??
    }
    
    function refuseChallenge() internal {
        // ??
    }
    
    function challenge(uint position) onlyPassengers() inState(State.Driving) {
        uint updatedArrival = now + 1 hours;
        if(updatedArrival < estimatedArrival) {
            // Challenge successful!
            acceptChallenge();
        } else {
            refuseChallenge();
        }
    }
}