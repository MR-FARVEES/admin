export interface Price {
    _id?: string;
    qty: string;
    price: string;
    date: string;
    __v?: number;
}

export interface Inventory {
    _id?: string;
    name: string;
    unit: string;
    category: string;
    stock?: Price[];
    __v?: number;
}