"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllocationStrategies = exports.RoomType = void 0;
var RoomType;
(function (RoomType) {
    RoomType["Standard"] = "standard";
    RoomType["Delux"] = "delux";
})(RoomType || (exports.RoomType = RoomType = {}));
var AllocationStrategies;
(function (AllocationStrategies) {
    AllocationStrategies["BottomToTop"] = "bottom-to-top";
    AllocationStrategies["TopToBottom"] = "top-to-bottom";
})(AllocationStrategies || (exports.AllocationStrategies = AllocationStrategies = {}));
