
# Book Allocation Algoritham

This project is a Hotel Room Allocation System designed to manage room bookings in a hotel, providing scalable and flexible functionality for room allocation, check-in, check-out, and dynamic pricing.

Key Features:
Room Allocation: The system supports multiple room allocation strategies, including bottom-to-top and top-to-bottom. Additional strategies can be easily added, such as prioritizing room types or other custom rules.

Room Management: Rooms are represented as objects with properties such as floor, room number, and type (e.g., standard, deluxe). Each room can be allocated or deallocated (checked in/out).

Dynamic Strategy System: The allocation strategy can be dynamically changed at runtime, allowing the system to scale by easily adding new strategies (e.g., cheapest first, deluxe first, etc.).

Flexible Check-in and Check-out: The system allows rooms to be checked in and checked out by their room numbers (as strings), making it simple to manage room availability.


# Scalability:

The Hotel Room Allocation System is designed to be scalable, ensuring that the system can adapt to new requirements and growing business needs. The following documentation outlines how scalability is implemented in the system and how you can extend it to meet future requirements.

1. Room Allocation Strategy Scalability
Dynamic Strategy Management
The system supports multiple allocation strategies that determine how rooms are assigned to guests. Currently, there are two default strategies:

Bottom-to-Top: Rooms are allocated starting from the bottom floor upwards.
Top-to-Bottom: Rooms are allocated starting from the top floor downwards.
Adding New Strategies
You can add new allocation strategies without modifying the core code. The Hotel class registers strategies dynamically using the registerAllocationStrategy method.

Example: Adding a new strategy based on room type prioritization

Define a new strategy in the AllocationStrategies enum:

`export enum AllocationStrategies {
    BottomToTop = 'bottom-to-top',
    TopToBottom = 'top-to-bottom',
    DeluxeFirst = 'deluxe-first',  
}`


Benefits:
Flexibility: Easily add new strategies based on evolving requirements.
No disruption: New strategies can be added without modifying existing code.
2. Room Type Scalability
Room Types and Conditions
The system allows different types of rooms (e.g., Standard, Deluxe), which are represented as part of the Room class. This provides flexibility to manage various room categories and conditions in the hotel.

Extending Room Types
You can extend the RoomType enum to add new types as the hotel business evolves:

`export enum RoomType {
    Standard = 'Standard',
    Deluxe = 'Deluxe',
    Suite = 'Suite',  // New room type
}`
Benefits:
Future-proofing: You can easily add new room types (e.g., VIP rooms, suites) without changing existing logic.
Room prioritization: New types can be prioritized during room allocation (e.g., Deluxe rooms first).

3. Check-in and Check-out Scalability
Flexible Check-in/Check-out Logic
Currently, the system supports basic check-in and check-out operations, where rooms are allocated and deallocated by their room numbers (as strings). This can be easily extended to include new rules, such as:

Late check-out policies.
VIP check-ins.
Partial check-outs for group bookings.
Extending the Check-in/Check-out Process:
Add new conditions for check-in and check-out:


## Installation

Install project with npm

```bash
  npm install
  cd my-project
```

To start project

```bash
  npm start
```

To test project

```bash
  npm run test
```
    