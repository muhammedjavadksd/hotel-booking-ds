import { AllocationStrategies, AllocationStrategy, RoomType } from "./type";

class Room {
    constructor(
        public floor: number,
        public roomNumber: number,
        public type: RoomType = RoomType.Standard,
        public isAllocated: boolean = false
    ) { }

    // Method to mark the room as allocated
    allocate() {
        this.isAllocated = true;
    }

    // Method to mark the room as available
    deallocate() {
        this.isAllocated = false;
    }
}

class Hotel {
    private rooms: Room[];
    private allocatedRooms: Set<string>;
    private allocationStrategies: Map<string, AllocationStrategy>;
    private allocationStrategy: AllocationStrategies;

    constructor(
        floors: number,
        roomsPerFloor: number,
        allocationStrategy: AllocationStrategies = AllocationStrategies.BottomToTop,
    ) {
        this.rooms = this.createRooms(floors, roomsPerFloor);
        this.allocatedRooms = new Set();
        this.allocationStrategies = new Map();
        this.allocationStrategy = allocationStrategy;

        // Register default strategies
        this.registerAllocationStrategy(AllocationStrategies.BottomToTop, this.defaultBottomToTopAllocation);
        this.registerAllocationStrategy(AllocationStrategies.TopToBottom, this.defaultTopToBottomAllocation);
    }

    // Helper method to create rooms
    private createRooms(floors: number, roomsPerFloor: number): Room[] {
        const rooms: Room[] = [];
        for (let floor = 1; floor <= floors; floor++) {
            for (let roomNumber = 1; roomNumber <= roomsPerFloor; roomNumber++) {
                rooms.push(new Room(floor, roomNumber));
            }
        }
        return rooms;
    }

    // Default room allocation strategy (bottom-to-top)
    private defaultBottomToTopAllocation(hotel: Hotel): Room[] {
        return hotel.getAvailableRooms();
    }

    // Default room allocation strategy (top-to-bottom)
    private defaultTopToBottomAllocation(hotel: Hotel): Room[] {
        return hotel.getAvailableRooms().reverse();
    }

    // Register a new allocation strategy
    private registerAllocationStrategy(name: AllocationStrategies, strategy: AllocationStrategy) {
        this.allocationStrategies.set(name, strategy);
    }

    // Use the current allocation strategy to generate available rooms
    private generateRoomNumbers(): Room[] {
        const strategy = this.allocationStrategies.get(this.allocationStrategy);
        if (!strategy) {
            throw new Error(`Strategy ${this.allocationStrategy} not found`);
        }
        return strategy(this);
    }

    // Change allocation strategy
    changeAllocationStrategy(strategyName: AllocationStrategies): void {
        if (!this.allocationStrategies.has(strategyName)) {
            throw new Error(`Strategy ${strategyName} not found`);
        }
        this.allocationStrategy = strategyName;
    }

    // Check in method, allocate rooms
    checkIn(numRooms: number): Room[] {
        const availableRooms = this.generateRoomNumbers();
        if (availableRooms.length < numRooms) {
            throw new Error('Not enough rooms available');
        }
        const allocatedRooms = availableRooms.slice(0, numRooms);
        allocatedRooms.forEach(room => room.allocate());
        for (let allocate of allocatedRooms) {
            this.allocatedRooms.add(`${allocate.floor}-${allocate.roomNumber}`);
        }
        return allocatedRooms;
    }

    // Check out method, deallocate rooms
    checkOut(roomNumbers: string[]): void {
        roomNumbers.forEach(roomNumberString => {
            const [floor, roomNumber] = roomNumberString.split('-').map(Number);
            const room = this.rooms.find(r => r.floor === floor && r.roomNumber === roomNumber);
            if (room) {
                room.deallocate();
                this.allocatedRooms.delete(roomNumberString);
            }
        });
    }

    // Get available rooms
    getAvailableRooms(): Room[] {
        return this.rooms.filter(room => !room.isAllocated);
    }

    // Get allocated rooms
    getAllocatedRooms(): string[] {
        return Array.from(this.allocatedRooms);
    }
}



const hotel = new Hotel(2, 2, AllocationStrategies.BottomToTop);
hotel.checkIn(2)
hotel.checkOut(['1-1'])
hotel.checkIn(2)
console.log(hotel.getAllocatedRooms());
