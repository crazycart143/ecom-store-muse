export interface Review {
    id: string;
    author: string;
    rating: number;
    date: string;
    comment: string;
    verified: boolean;
}

export interface Product {
    id: string;
    title: string;
    handle: string;
    price: number;
    currency: string;
    image: string;
    images?: string[];
    category: string;
    description?: string;
    reviews?: Review[];
}

export const products: Product[] = [
    // Tops
    {
        id: "1",
        title: "Essential Oversized Tee",
        handle: "essential-oversized-tee",
        price: 45.00,
        currency: "USD",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
        images: [
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800"
        ],
        category: "Tops",
        description: "A staple for any wardrobe. Our Essential Oversized Tee is crafted from 100% organic cotton, featuring a dropped shoulder and a relaxed, boxy fit.",
        reviews: [
            { id: "r1", author: "Alex J.", rating: 5, date: "2023-10-12", comment: "Best fit I've ever found for an oversized tee. Doesn't lose shape after washing.", verified: true },
            { id: "r2", author: "Sarah L.", rating: 4, date: "2023-11-05", comment: "Lovely fabric, really soft. Slightly more oversized than expected but looks great.", verified: true }
        ]
    },
    {
        id: "7",
        title: "Heavyweight Cotton T-Shirt",
        handle: "heavyweight-cotton-t-shirt",
        price: 55.00,
        currency: "USD",
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800",
        images: [
            "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800"
        ],
        category: "Tops",
        description: "Engineered for durability. This 300gsm cotton tee provides a structured look and feel that only gets better with age.",
        reviews: [
            { id: "r3", author: "Marcus T.", rating: 5, date: "2023-09-20", comment: "Incredible quality. This actually feels like it will last a lifetime.", verified: true }
        ]
    },
    {
        id: "8",
        title: "Relaxed Fit Button Down",
        handle: "relaxed-fit-button-down",
        price: 85.00,
        currency: "USD",
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800",
        images: [
            "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1621072138294-592fdb0945ac?auto=format&fit=crop&q=80&w=800"
        ],
        category: "Tops"
    },

    // Bottoms
    {
        id: "2",
        title: "Structured Cargo Pant",
        handle: "structured-cargo-pant",
        price: 120.00,
        currency: "USD",
        image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800",
        images: [
            "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800"
        ],
        category: "Bottoms",
        reviews: [
            { id: "r4", author: "Jordan P.", rating: 4, date: "2023-12-01", comment: "Pockets are actually useful! Great material.", verified: true }
        ]
    },
    {
        id: "9",
        title: "Tapered Pleated Trouser",
        handle: "tapered-pleated-trouser",
        price: 110.00,
        currency: "USD",
        image: "https://images.unsplash.com/photo-1594931936324-4f57fb49872e?auto=format&fit=crop&q=80&w=800",
        images: [
            "https://images.unsplash.com/photo-1594931936324-4f57fb49872e?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1598533123412-30058e530060?auto=format&fit=crop&q=80&w=800"
        ],
        category: "Bottoms"
    },
    {
        id: "10",
        title: "Wide Leg Denim",
        handle: "wide-leg-denim",
        price: 140.00,
        currency: "USD",
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800",
        images: [
            "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&q=80&w=800"
        ],
        category: "Bottoms"
    },

    // Outerwear
    {
        id: "3",
        title: "Monochrome Hoodie",
        handle: "monochrome-hoodie",
        price: 85.00,
        currency: "USD",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800",
        images: [
            "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1556821921-256ef684b60f?auto=format&fit=crop&q=80&w=800"
        ],
        category: "Outerwear"
    },
    {
        id: "5",
        title: "Utility Jacket",
        handle: "utility-jacket",
        price: 210.00,
        currency: "USD",
        image: "https://images.unsplash.com/photo-1551028919-ac7bea5fa53e?auto=format&fit=crop&q=80&w=800",
        images: [
            "https://images.unsplash.com/photo-1551028919-ac7bea5fa53e?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1455243627071-93026382a441?auto=format&fit=crop&q=80&w=800"
        ],
        category: "Outerwear"
    },
    {
        id: "11",
        title: "Wool Blend Coat",
        handle: "wool-blend-coat",
        price: 350.00,
        currency: "USD",
        image: "https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&q=80&w=800",
        images: [
            "https://images.unsplash.com/photo-1544923246-77307dd654cb?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800"
        ],
        category: "Outerwear"
    },
    {
        id: "12",
        title: "Tech Fleece Zip-Up",
        handle: "tech-fleece-zip-up",
        price: 130.00,
        currency: "USD",
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800",
        images: [
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?auto=format&fit=crop&q=80&w=800"
        ],
        category: "Outerwear"
    },

    // Footwear
    {
        id: "4",
        title: "Minimalist Sneaker",
        handle: "minimalist-sneaker",
        price: 180.00,
        currency: "USD",
        image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=800",
        images: [
            "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&q=80&w=800"
        ],
        category: "Footwear"
    },
    {
        id: "13",
        title: "Leather Chelsea Boot",
        handle: "leather-chelsea-boot",
        price: 220.00,
        currency: "USD",
        image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&q=80&w=800",
        images: [
            "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800"
        ],
        category: "Footwear"
    },

    // Accessories
    {
        id: "6",
        title: "Signature Cap",
        handle: "signature-cap",
        price: 35.00,
        currency: "USD",
        image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89d?auto=format&fit=crop&q=80&w=800",
        images: [
            "https://images.unsplash.com/photo-1588850561407-ed78c282e89d?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1572420135384-39f59f4a7420?auto=format&fit=crop&q=80&w=800"
        ],
        category: "Accessories"
    },
    {
        id: "14",
        title: "Canvas Tote Bag",
        handle: "canvas-tote-bag",
        price: 40.00,
        currency: "USD",
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800",
        images: [
            "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1605733513597-a8f8d410fe3c?auto=format&fit=crop&q=80&w=800"
        ],
        category: "Accessories"
    },
    {
        id: "15",
        title: "Silver Chain Necklace",
        handle: "silver-chain-necklace",
        price: 90.00,
        currency: "USD",
        image: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&q=80&w=800",
        images: [
            "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1611085583191-a3b15820bb8e?auto=format&fit=crop&q=80&w=800"
        ],
        category: "Accessories"
    }
];

export interface Collection {
    id: string;
    title: string;
    handle: string;
    image: string;
    description: string;
}

export const collections: Collection[] = [
    {
        id: "c1",
        title: "The Monochrome Edit",
        handle: "monochrome-edit",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800",
        description: "Black, white, and everything in between."
    },
    {
        id: "c2",
        title: "Winter Essentials",
        handle: "winter-essentials",
        image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&q=80&w=800",
        description: "Function meets fashion for the cold season."
    },
    {
        id: "c3",
        title: "Urban Utility",
        handle: "urban-utility",
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800",
        description: "Practical gear for city living."
    }
];

export function getProductByHandle(handle: string): Product | undefined {
    return products.find(p => p.handle === handle);
}
