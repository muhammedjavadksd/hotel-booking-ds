"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hotel = void 0;
const type_1 = require("./type");
class Room {
    constructor(floor, roomNumber, type = type_1.RoomType.Standard, isAllocated = false) {
        this.floor = floor;
        this.roomNumber = roomNumber;
        this.type = type;
        this.isAllocated = isAllocated;
    }
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
    constructor(floors, roomsPerFloor, allocationStrategy = type_1.AllocationStrategies.BottomToTop) {
        this.rooms = this.createRooms(floors, roomsPerFloor);
        this.allocatedRooms = new Set();
        this.allocationStrategies = new Map();
        this.allocationStrategy = allocationStrategy;
        // Register default strategies
        this.registerAllocationStrategy(type_1.AllocationStrategies.BottomToTop, this.defaultBottomToTopAllocation);
        this.registerAllocationStrategy(type_1.AllocationStrategies.TopToBottom, this.defaultTopToBottomAllocation);
    }
    // Helper method to create rooms
    createRooms(floors, roomsPerFloor) {
        const rooms = [];
        for (let floor = 1; floor <= floors; floor++) {
            for (let roomNumber = 1; roomNumber <= roomsPerFloor; roomNumber++) {
                rooms.push(new Room(floor, roomNumber));
            }
        }
        return rooms;
    }
    // Default room allocation strategy (bottom-to-top)
    defaultBottomToTopAllocation(hotel) {
        return hotel.getAvailableRooms();
    }
    // Default room allocation strategy (top-to-bottom)
    defaultTopToBottomAllocation(hotel) {
        return hotel.getAvailableRooms().reverse();
    }
    // Register a new allocation strategy
    registerAllocationStrategy(name, strategy) {
        this.allocationStrategies.set(name, strategy);
    }
    // Use the current allocation strategy to generate available rooms
    generateRoomNumbers() {
        const strategy = this.allocationStrategies.get(this.allocationStrategy);
        if (!strategy) {
            throw new Error(`Strategy ${this.allocationStrategy} not found`);
        }
        return strategy(this);
    }
    // Change allocation strategy
    changeAllocationStrategy(strategyName) {
        if (!this.allocationStrategies.has(strategyName)) {
            throw new Error(`Strategy ${strategyName} not found`);
        }
        this.allocationStrategy = strategyName;
    }
    // Check in method, allocate rooms
    checkIn(numRooms) {
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
    checkOut(roomNumbers) {
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
    getAvailableRooms() {
        return this.rooms.filter(room => !room.isAllocated);
    }
    // Get allocated rooms
    getAllocatedRooms() {
        return Array.from(this.allocatedRooms);
    }
}
exports.Hotel = Hotel;
const hotel = new Hotel(2, 2, type_1.AllocationStrategies.BottomToTop);
hotel.checkIn(1);
hotel.changeAllocationStrategy(type_1.AllocationStrategies.TopToBottom);
hotel.checkIn(1);
console.log(hotel.getAvailableRooms());
