import { ReactNode } from "react";

export type Product = {
    id:string ,
    name: string,
    price: string,
    stock: number
}

export type CartContextType = {
    cart:Product[],
    products:Product[],
    addToCart: (product: Product) => void;
    increaseQuantity: (id: string) => void;
    decreaseQuantity: (id: string) => void;
    removeItem: (id:string) => void;
    clearCart: () => void;
}

export type CartProviderProps = {
    children : ReactNode
}

export type CardComponent = {
    product : Product,
    type : string,
}

export type BtnComponent = {
    children: ReactNode,
    action: () => void
}