import { parentPort } from "worker_threads";
import servicesNotify from "../services/workerNotifyDebts/serviceDetectUpcomingDebts";


parentPort?.on('message', (data) => {
    console.log("mensaje recibido")
    const servicesNotifyDebts = new servicesNotify();
    servicesNotifyDebts.getDebtsDueWithinWeek();
    
})
