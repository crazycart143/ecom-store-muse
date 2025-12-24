import { ProductCard } from "@/components/ProductCard";
import Link from "next/link";
import { products, collections } from "@/lib/mock-data";
import { Marquee } from "@/components/Marquee";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-secondary text-primary min-h-[80vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-40"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 animate-in slide-in-from-bottom-8 duration-700">
            WINTER <br/> COLLECTION
          </h1>
          <p className="max-w-xl mx-auto text-gray-200 text-xl mb-10 font-light">
             Timeless essentials designed for the modern individual. <br/>Embrace the monochrome.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/shop" className="bg-white text-black px-10 py-4 rounded-full font-bold hover:bg-accent hover:text-white transition-all transform hover:scale-105">
              Shop All
            </Link>
            <Link href="/about" className="border border-white text-white px-10 py-4 rounded-full font-bold hover:bg-white hover:text-black transition-all">
              Explore
            </Link>
          </div>
        </div>
      </section>

      <Marquee />

      {/* Collections Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
         <div className="flex justify-between items-end mb-12">
            <h2 className="text-4xl font-bold text-secondary tracking-tight">Curated Collections</h2>
            <Link href="/shop" className="text-sm font-medium border-b border-black pb-1 hover:text-gray-600 transition-colors">View All Collections</Link>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {collections.map(collection => (
              <Link key={collection.id} href="/shop" className="group block relative aspect-[4/5] overflow-hidden">
                 <Image 
                   src={collection.image} 
                   alt={collection.title} 
                   fill 
                   className="object-cover group-hover:scale-105 transition-transform duration-700"
                 />
                 <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                 <div className="absolute bottom-0 left-0 p-8 text-white">
                    <h3 className="text-2xl font-bold mb-2">{collection.title}</h3>
                    <p className="text-gray-200 text-sm hidden group-hover:block transition-all animate-in fade-in slide-in-from-bottom-2">{collection.description}</p>
                 </div>
              </Link>
            ))}
         </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-50 py-24">
        {/* ... existing latest arrivals ... */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-secondary mb-4">Latest Arrivals</h2>
            <p className="text-gray-500">Fresh from the studio.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Link href="/shop" className="inline-block bg-black text-white px-12 py-4 rounded-full font-bold hover:bg-gray-800 transition-colors">
               View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 max-w-3xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-secondary mb-4">Questions?</h2>
          <p className="text-gray-500">Some things you might be wondering about.</p>
        </div>
        <div className="space-y-4">
          {[
            { q: "How long does shipping take?", a: "Standard shipping takes 3-7 business days." },
            { q: "What is your return policy?", a: "We offer a 30-day free return policy." },
            { q: "Can I track my order?", a: "Yes, you'll receive a tracking link via email." }
          ].map((faq, i) => (
            <details key={i} className="group border border-gray-100 rounded-xl overflow-hidden">
              <summary className="flex justify-between items-center p-6 cursor-pointer hover:bg-gray-50 transition-colors list-none">
                <span className="font-semibold text-secondary">{faq.q}</span>
                <span className="text-accent group-open:rotate-45 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>
                </span>
              </summary>
              <div className="px-6 pb-6 text-gray-500 leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/faq" className="text-sm font-bold underline underline-offset-4 hover:text-accent transition-colors">
            View All FAQs
          </Link>
        </div>
      </section>
      
      {/* Promo Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto bg-black text-white rounded-2xl overflow-hidden relative">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-50 mix-blend-overlay"></div>
           <div className="relative z-10 py-32 px-8 text-center">
              <span className="text-accent font-bold tracking-widest uppercase mb-4 block">Limited Time</span>
              <h2 className="text-5xl md:text-7xl font-black mb-8">END OF SEASON SALE</h2>
              <p className="text-xl max-w-2xl mx-auto mb-10 text-gray-300">Up to 50% off on selected items. Don't miss out on these exclusive deals before they're gone.</p>
              <Link href="/shop" className="bg-white text-black px-12 py-5 rounded-full font-bold text-lg hover:bg-gray-200 transition-colors">
                Shop The Sale
              </Link>
           </div>
        </div>
      </section>
    </div>
  );
}
