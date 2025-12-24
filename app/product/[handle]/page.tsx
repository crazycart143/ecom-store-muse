import { notFound } from "next/navigation";
import { getProductByHandle } from "@/lib/mock-data";
import { ProductDetails } from "./product-details";

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
}
