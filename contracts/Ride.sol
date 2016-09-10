contract Ride {
    address public driver;
    mapping(address=>bool) isPassenger;
    uint public from;
    uint public to;
    uint nbPassengers;
    
    uint public estimatedArrival;
    
    uint MAX_PASSENGERS = 2;

    enum State {Joining, Full, Driving, Closed}
    
    State state = State.Joining;
    
    modifier inState(State _state) {
        if(state != _state) throw;
        _;
    }

    function Ride(uint _from, uint _to, address _driver) {
        driver = _driver;
        from = _from;
        to = _to;
    }
    
    function joinRide() inState(State.Joining) {
        isPassenger[msg.sender] = true;
        nbPassengers++;
        if(nbPassengers == MAX_PASSENGERS) {
            state = State.Full;
        }
    }
    
    function startRide(uint position) inState(State.Full) {
        state = State.Driving;
        estimatedArrival;
    }
}