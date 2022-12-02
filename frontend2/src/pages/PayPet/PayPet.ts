/* eslint-disable @typescript-eslint/naming-convention */

export interface ReceiverAddress {
    zip_code: string;
    street_name: string;
    street_number: null;
    floor: string;
    apartment: string;
    city_name: null;
    state_name: null;
    country_name: null;
}

export interface Urls {
    failure: string;
    pending: string;
    success: string;
}

export interface Item {
    id: string;
    category_id: string;
    currency_id: string;
    description: string;
    picture_url: string;
    title: string;
    quantity: number;
    unit_price: number;
}

export interface Metadata {
}

export interface Address {
    zip_code: string;
    street_name: string;
    street_number: null;
}

export interface Identification {
    number: string;
    type: string;
}

export interface Phone {
    area_code: string;
    number: string;
}

export interface Payer {
    phone: Phone;
    address: Address;
    email: string;
    identification: Identification;
    name: string;
    surname: string;
    date_created: null;
    last_purchase: null;
}
export interface ExcludedPayment {
    id: string;
}

export interface Shipments {
    default_shipping_method: null;
    receiver_address: ReceiverAddress;
}


export interface PaymentMethods {
    default_card_id: null;
    default_payment_method_id: null;
    excluded_payment_methods: ExcludedPayment[];
    excluded_payment_types: ExcludedPayment[];
    installments: null;
    default_installments: null;
}


export interface ResponseMercadoPago {
    additional_info: string;
    auto_return: string;
    back_urls: Urls;
    binary_mode: boolean;
    client_id: string;
    collector_id: number;
    date_created: Date;
    expires: boolean;
    external_reference: string;
    id: string;
    items: Item[];
    marketplace: string;
    marketplace_fee: number;
    metadata: Metadata;
    operation_type: string;
    payer: Payer;
    payment_methods: PaymentMethods;
    redirect_urls: Urls;
    init_point: string;
    sandbox_init_point: string;
    site_id: string;
    shipments: Shipments;
}

export interface BackUrls {
}

export interface RequestMercadoPago {
    items: Item[];
    back_urls: BackUrls;
}


export interface Item {
    title: string;
    description: string;
    picture_url: string;
    category_id: string;
    quantity: number;
    unit_price: number;
}
