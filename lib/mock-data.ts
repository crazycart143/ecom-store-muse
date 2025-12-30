/* ----------------------------------------
   API TYPES (Fake Store)
---------------------------------------- */
interface FakeStoreProduct {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

/* ----------------------------------------
   Reviews
---------------------------------------- */
export interface Review {
    id: string;
    author: string;
    rating: number;
    date: string;
    comment: string;
    verified: boolean;
}

/* ----------------------------------------
   Product
---------------------------------------- */
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

/* ----------------------------------------
   Fallback products (API down safety)
---------------------------------------- */
export const products: Product[] = [
    {
        id: "f1",
        title: "Essential Oversized Tee",
        handle: "essential-oversized-tee",
        price: 45,
        currency: "USD",
        image:
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
        images: [
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&q=80&w=800",
        ],
        category: "Apparel",
        description: "A relaxed-fit essential tee crafted for everyday comfort.",
    },
];

/* ----------------------------------------
   Helpers
---------------------------------------- */
const createHandle = (title: string, id: number) =>
    `${title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "")}-${id}`;

/* ----------------------------------------
   API — Fake Store (Typed)
---------------------------------------- */
export async function getProducts(): Promise<Product[]> {
    try {
        const res = await fetch("https://fakestoreapi.com/products", {
            cache: "no-store",
        });

        const data: FakeStoreProduct[] = await res.json();

        return data.map((item) => ({
            id: item.id.toString(),
            title: item.title,
            handle: createHandle(item.title, item.id),
            price: item.price,
            currency: "USD",
            image: item.image,
            images: [item.image],
            category: item.category,
            description: item.description,
            reviews: [
                {
                    id: `r-${item.id}`,
                    author: "Verified Customer",
                    rating: 5,
                    date: new Date().toISOString(),
                    comment: "Great quality and fast shipping. Will buy again.",
                    verified: true,
                },
            ],
        }));
    } catch {
        return products;
    }
}

export async function getProductByHandle(
    handle: string
): Promise<Product | undefined> {
    const all = await getProducts();
    return all.find((p) => p.handle === handle);
}

export async function searchProducts(query: string): Promise<Product[]> {
    if (!query) return [];

    try {
        const res = await fetch("https://fakestoreapi.com/products", {
            next: { revalidate: 3600 },
        });

        const data: FakeStoreProduct[] = await res.json();

        return data
            .filter((item) =>
                item.title.toLowerCase().includes(query.toLowerCase())
            )
            .slice(0, 10)
            .map((item) => ({
                id: item.id.toString(),
                title: item.title,
                handle: createHandle(item.title, item.id),
                price: item.price,
                currency: "USD",
                image: item.image,
                category: item.category,
            }));
    } catch {
        return [];
    }
}

/* ----------------------------------------
   Collections
---------------------------------------- */
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
        image:
            "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800",
        description: "Black, white, and everything in between.",
    },
    {
        id: "c2",
        title: "Winter Essentials",
        handle: "winter-essentials",
        image:
            "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&q=80&w=800",
        description: "Function meets fashion for the cold season.",
    },
    {
        id: "c3",
        title: "Urban Utility",
        handle: "urban-utility",
        image:
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800",
        description: "Practical gear for city living.",
    },
];
