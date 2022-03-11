
export interface Product {
    id: number;
    name: string;
    description?: string;
    price?: number;
    author?: string;
    type?: string;
    img?: string;
    inCart?: boolean;
    category: string;
    color:string;
}

export interface ProductFilters { 
    category: string[] ;
    color:string[];
}
 