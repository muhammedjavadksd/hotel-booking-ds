export type AllocationStrategy = (hotel: any) => any[];

export enum RoomType {
    Standard = "standard",
    Delux = "delux"
}

export enum AllocationStrategies {
    BottomToTop = "bottom-to-top",
    TopToBottom = "top-to-bottom",
}