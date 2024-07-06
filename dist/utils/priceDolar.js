"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPriceDolar = void 0;
const getPriceDolar = async () => {
    const url = 'https://dolarapi.com/v1/dolares/blue';
    const price = await fetch(url)
        .then(response => response.json())
        .then(data => { return data; });
    return price.compra;
};
exports.getPriceDolar = getPriceDolar;
