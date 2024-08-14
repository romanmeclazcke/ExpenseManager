"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMonthName = void 0;
function getMonthName(month) {
    const meses = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
    ];
    return meses[month - 1];
}
exports.getMonthName = getMonthName;
