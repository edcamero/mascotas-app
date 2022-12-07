
import imageNequi from '../../../Static/images/nequi.png'
import imageBancolombia from '../../../Static/images/bancolombia.png'
import imageMercadoPago from '../../../Static/images/mercadopago.png'
export interface IPaymentmethods {
    text: string
    image: string
    link?: string
}

export const paymentmethods: IPaymentmethods[] = [{ text: 'Nequi', image: imageNequi }, { text: 'Bancolombia', image: imageBancolombia }, { text: 'Mercado Pago', image: imageMercadoPago, link:'donation' }]