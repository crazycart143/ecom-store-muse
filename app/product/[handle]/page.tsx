import { notFound } from "next/navigation";
import { getProductByHandle, products } from "@/lib/mock-data";
import { ProductDetails } from "./product-details";

export async function generateStaticParams() {
  return products.map((product) => ({
    handle: product.handle,
  }));
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const product = getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}
