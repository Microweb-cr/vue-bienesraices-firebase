export const priceProperty = (price) => 
    Number(price).toLocaleString('es-CR', {
        style: 'currency',
        currency: 'CRC'
    });
