"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const worker_threads_1 = require("worker_threads");
const serviceDetectUpcomingDebts_1 = __importDefault(require("../services/workerNotifyDebts/serviceDetectUpcomingDebts"));
worker_threads_1.parentPort?.on('message', (data) => {
    console.log("mensaje recibido");
    const servicesNotifyDebts = new serviceDetectUpcomingDebts_1.default();
    servicesNotifyDebts.getDebtsDueWithinWeek();
});
