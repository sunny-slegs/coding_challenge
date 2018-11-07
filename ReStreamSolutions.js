
/*
<finalDestination> is a string specified as <floor>-<time>, e.g. “3-2”, 
    indicating that the final destination is the 3rd floor at time t=2.

t=1, you begin in the elevator specified by <startingElevator>, e.g. “A”.

Sample Input:

elevatorStates = [
    // State @ t=1
    `xx.x.x.xDxx
     xx.x.x.x.xx
     xx.x.x.x.xx
     xx.xBx.x.xx
     xx.x.xCx.xx
     xxAx.x.x.xx`,
    // State @ t=2
    `xx.x.x.x.xx
     xx.x.x.x.xx
     xxAx.x.x.xx
     xx.xBx.x.xx
     xx.x.xCx.xx
     xx.x.x.xDxx`,
    // State @ t=3
    `xx.x.xCx.xx
     xx.x.x.x.xx
     xx.x.x.x.xx
     xxAxBx.x.xx
     xx.x.x.x.xx
     xx.x.x.xDxx`,
    // State @ t=4
    `xx.x.xCx.xx
     xx.x.x.x.xx
     xx.xBx.xDxx
     xx.x.x.x.xx
     xxAx.x.x.xx
     xx.x.x.x.xx`,
     // State @ t=5
    `xx.x.xCx.xx
     xx.x.x.xDxx
     xx.x.x.x.xx
     xx.x.x.x.xx
     xxAxBx.x.xx
     xx.x.x.x.xx`,
   ]
   
   startingElevator = "A"
   finalDestination = "5-5"
   
   Sample Output:
   "AABDD"

   */

   function findElevatorPath(elevatorStates, startingElevator, finalDestination) {
        // loop through the states and turn each string into an array of 6 strings 
        // 1. check to make sure there is a state that has an eleveator at the correct floor at the specified time
        //      and return "NO SOLUTION POSSIBLE" if there is not
        // 2. find the elevator that is at the final destination 
        // 3. use recursion to follow all possible paths beginning @ startingElevator and ending on desired
        //      floor and time
        // 4. 
        
        // split each floor into a seperate string
        const statesArr = elevatorStates.map(state => {
            return(state.split("\n"))
        })
        const finalFloor = Number(finalDestination.charAt(0));
        const totalTime = Number(finalDestination.charAt(2));
        const finalTime = Number(finalDestination.charAt(2)) - 1;
        const indexInStatesArr = {
            1: 5,
            2: 4,
            3: 3,
            4: 2,
            5: 1,
            6: 0
        }
        const finalState = statesArr[finalTime][indexInStatesArr[finalFloor]]
        // 1. check to make sure there is a state that has an elevator at the correct floor at the specified time
        //     and return "NO SOLUTION POSSIBLE" if there is not
        if (!(finalState.includes("A") || finalState.includes("B") || finalState.includes("C") || finalState.includes("D"))) {
            return "NO POSSIBLE SOLUTION"
        }
        let time = 0;
        // find starting floor
        // const startingFloor = findFloor(statesArr[0], startingElevator)
        // console.log("starting floor is ", startingFloor);
        let paths = [];
        findPaths(statesArr, startingElevator, paths, totalTime)
        console.log(paths);
        // while (time != finalTime) {
        //     statesArr[0]
        // }
        
   }
   // takes a string as an argument
   function findElevator(floor) {
       console.log(floor)
        let elevator = "";
        if (floor.includes("A")) {
            elevator += "A"
        }
        if (floor.includes("B")) {
            elevator += "B"
        }
        if (floor.includes("C")) {
            elevator += "C"
        }
        if (floor.includes("D")) {
            elevator += "D"
        }
        return elevator;
   }

   // takes an array of strings and a string
   function findFloor(state, elevator) {
    //    console.log("state", state, "elevator", elevator)
       for (let i = 0; i < state.length; i++) {
           if (state[i].includes(elevator)) {
            //    console.log(i, elevator)
               return i; // returns the floor number
           }
       }
   }

   // takes an array of strings, number, string, number
   function findPaths(state, elevator, paths, time) {
        let path = "";
        console.log(path)
        for (let i=0; i<time; i++) {
            // add first elevator to path
            if (i === 0) {
                path += elevator;
                continue;
            }
            // recursivley find the next elevator to add to path
            state = state.slice(1);
            let floor = findFloor(state[0], elevator);
            let elevators = findElevator(state[0][floor])
            if (elevators === elevator) {
                path += elevator;
            } else {
                elevators.split().forEach(elevator => {
                    path += elevator;
                    console.log(path)
                    findPaths(state, elevator, paths, time-i)
                })
            }
        }
        paths.push(path)
   }
  


const States = [
    // State @ t=1
    `xx.x.x.xDxx
     xx.x.x.x.xx
     xx.x.x.x.xx
     xx.xBx.x.xx
     xx.x.xCx.xx
     xxAx.x.x.xx`,
    // State @ t=2
    `xx.x.x.x.xx
     xx.x.x.x.xx
     xxAx.x.x.xx
     xx.xBx.x.xx
     xx.x.xCx.xx
     xx.x.x.xDxx`,
    // State @ t=3
    `xx.x.xCx.xx
     xx.x.x.x.xx
     xx.x.x.x.xx
     xxAxBx.x.xx
     xx.x.x.x.xx
     xx.x.x.xDxx`,
    // State @ t=4
    `xx.x.xCx.xx
     xx.x.x.x.xx
     xx.xBx.xDxx
     xx.x.x.x.xx
     xxAx.x.x.xx
     xx.x.x.x.xx`,
     // State @ t=5
    `xx.x.xCx.xx
     xx.x.x.xDxx
     xx.x.x.x.xx
     xx.x.x.x.xx
     xxAxBx.x.xx
     xx.x.x.x.xx`,
   ]
findElevatorPath(States, "A", "5-5")