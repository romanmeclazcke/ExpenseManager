"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const worker_threads_1 = require("worker_threads");
const serviceDetectUpcomingDebts_1 = __importDefault(require("../services/notifyServices/serviceDetectUpcomingDebts"));
const servicesNotifyDebts = new serviceDetectUpcomingDebts_1.default();
worker_threads_1.parentPort?.on('message', (data) => {
    servicesNotifyDebts.getDebtsDueWithinWeek();
});
