import { Hotel } from '.';
import { AllocationStrategies } from './type';

describe('Hotel', () => {
    let hotel: Hotel;


    beforeEach(() => {
        hotel = new Hotel(2, 2, AllocationStrategies.BottomToTop);
    });

    test('should create a hotel with rooms', () => {
        expect(hotel).toBeDefined();
        expect(hotel.getAvailableRooms().length).toBe(4);
    });

    test('should allocate rooms correctly using BottomToTop strategy', () => {
        hotel.checkIn(1);
        const availableRooms = hotel.getAvailableRooms();
        const allocatedRooms = hotel.getAllocatedRooms();

        // There should be 3 available rooms after checking in 1
        expect(availableRooms.length).toBe(3);
        expect(allocatedRooms.length).toBe(1);
    });

    test('should change allocation strategy to TopToBottom', () => {
        hotel.changeAllocationStrategy(AllocationStrategies.TopToBottom);
        hotel.checkIn(1);
        const availableRooms = hotel.getAvailableRooms();

        // After changing to TopToBottom, there should still be 3 rooms available
        expect(availableRooms.length).toBe(3);
    });

    test('should allocate rooms correctly using TopToBottom strategy', () => {
        hotel.changeAllocationStrategy(AllocationStrategies.TopToBottom);
        hotel.checkIn(1);
        const availableRooms = hotel.getAvailableRooms();

        // 2 rooms should be allocated, 2 should remain available, and we use top-to-bottom allocation
        expect(availableRooms.length).toBe(3);
    });

    test('should throw error if not enough rooms are available during check-in', () => {
        hotel.checkIn(4);  // We only have 4 rooms, so trying to allocate 5 should throw an error
        expect(() => hotel.checkIn(1)).toThrow('Not enough rooms available');
    });

    test('should deallocate rooms correctly during check-out', () => {
        hotel.checkIn(2);  // Check in 2 rooms
        const allocatedRooms = hotel.getAllocatedRooms();
        expect(allocatedRooms.length).toBe(2);

        hotel.checkOut(allocatedRooms);  // Check out the allocated rooms
        expect(hotel.getAvailableRooms().length).toBe(4);  // All rooms should be available now
    });

    test('should return correct available rooms after allocation and deallocation', () => {
        hotel.checkIn(2);  // Check in 2 rooms
        const availableRoomsBeforeCheckOut = hotel.getAvailableRooms();
        expect(availableRoomsBeforeCheckOut.length).toBe(2);  // 4 rooms initially, 2 are allocated

        hotel.checkOut(['1-1', '1-2']);  // Deallocate rooms 1-1 and 1-2
        const availableRoomsAfterCheckOut = hotel.getAvailableRooms();
        expect(availableRoomsAfterCheckOut.length).toBe(4);  // Now all rooms should be available again
    });
});
