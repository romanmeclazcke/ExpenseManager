"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePercentage = void 0;
const calculatePercentage = async (ultimateGoal, currentAmount) => {
    try {
        return Math.trunc((currentAmount / ultimateGoal) * 100);
    }
    catch (error) {
        throw new Error('Error al calcular el porcentaje actual de la meta');
    }
};
exports.calculatePercentage = calculatePercentage;
