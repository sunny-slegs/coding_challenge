
   function findElevatorPath(elevatorStates, startingElevator, finalDestination) {

        
        // split each state into an array of floor strings
        const statesArr = elevatorStates.map(state => {
            return(state.split("\n"))
        })
        const finalFloor = Number(finalDestination.charAt(0));
        const totalTime = Number(finalDestination.charAt(2));
        const finalTime = Number(finalDestination.charAt(2)) - 1;
        // object with each floor number and its corresponding index in the state array
        const indexInStatesArr = {
            1: 5,
            2: 4,
            3: 3,
            4: 2,
            5: 1,
            6: 0
        }
        const startingFloor = findFloor(statesArr[0], startingElevator);
        const finalFloorStr = statesArr[finalTime][indexInStatesArr[finalFloor]];
        const floorStr = statesArr[0][indexInStatesArr[startingFloor]];
        // check to make sure there is a state that has an elevator at the correct floor at the specified time
        if (!(finalFloorStr.includes("A") || finalFloorStr.includes("B") || finalFloorStr.includes("C") || finalFloorStr.includes("D"))) {
            return "NO POSSIBLE SOLUTION"
        // recursively find all possible paths 
        } else {
            findPaths(statesArr, finalTime, floorStr, startingElevator, indexInStatesArr) 
        }
        
   }
   // floor = string
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

   // state = array of strings, elevator = string
   function findFloor(state, elevator) {
    //    console.log("state", state, "elevator", elevator)
       for (let i = 0; i < state.length; i++) {
           if (state[i].includes(elevator)) {
            //    console.log(i, elevator)
               return 6-i; // returns the floor number
           }
       }
   }

   // state = array of strings, finalTime = number, floorStr = string, startingElevaotr = string, index = number
   function findPaths(state, finalTime, floorStr, startingElevator, index) {
    let time = 0;
    let paths = [];
    let path = "";
    while (time != finalTime) {
        let elevator = findElevator(floorStr)
        if (elevator === startingElevator) {
            path += elevator;
            // find the next floor
            const nextFloor = findFloor(state[time + 1], elevator);
            let i = index[nextFloor]
            floorStr = state[time + 1][i];
        } else {
           elevator.split("").forEach(elevator => {
               path += elevator;
               const nextFloor = findFloor(state[time + 1], elevator);
               let i = index[nextFloor]
               floorStr = state[time + 1][i];
               findPaths(state, finalTime, floorStr, elevator, index)
           })
        }
        time++
    }
    console.log("path", path)
    return path;
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