import { parentPort } from "worker_threads";
import servicesNotify from "../services/notifyServices/serviceDetectUpcomingDebts";

const servicesNotifyDebts = new servicesNotify();


parentPort?.on('message', (data) => {
    servicesNotifyDebts.getDebtsDueWithinWeek();
})