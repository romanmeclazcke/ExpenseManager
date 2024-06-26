"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePercentage = void 0;
const calculatePercentage = async (ultimateGoal, currentAmount) => {
    try {
        return (currentAmount / ultimateGoal) * 100;
    }
    catch (error) {
        console.log(error);
    }
};
exports.calculatePercentage = calculatePercentage;
