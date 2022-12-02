
export interface IPaymentmethods {
    text: string
    image: string
    link?: string
}

export const paymentmethods: IPaymentmethods[] = [{ text: 'Nequi', image: `public/uploads//nequi.png` }, { text: 'Bancolombia', image: `public/uploads//bancolombia.png` }, { text: 'Mercado Pago', image: `public/uploads//mercadopago.png`, link:'donation' }]