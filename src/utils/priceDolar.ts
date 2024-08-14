export const getPriceDolar= async()=>{
    const url = 'https://dolarapi.com/v1/dolares/blue';

    const price = await fetch(url)
        .then(response=>response.json())
            .then(data => { return data } );

    return price.compra;
}