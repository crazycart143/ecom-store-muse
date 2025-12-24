export default function ShippingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 md:py-24 prose prose-zinc lg:prose-lg prose-headings:text-secondary prose-headings:font-bold">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8 text-secondary">Shipping & Returns</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl border-b border-gray-100 pb-2">Shipping Information</h2>
        <p className="text-gray-500">
          At Muse, we strive to deliver your essentials as quickly and efficiently as possible. 
          All orders are shipped from our central warehouse within 1-2 business days of payment verification.
        </p>
        <ul className="text-gray-500 list-none pl-0">
          <li className="flex justify-between py-2 border-b border-gray-50">
            <span className="font-medium text-secondary">Domestic Shipping (US)</span>
            <span>$5.00 (Standard) / Free over $150</span>
          </li>
          <li className="flex justify-between py-2 border-b border-gray-50">
            <span className="font-medium text-secondary">Express Shipping (US)</span>
            <span>$15.00 (2-3 Business Days)</span>
          </li>
          <li className="flex justify-between py-2 border-b border-gray-50">
            <span className="font-medium text-secondary">International Shipping</span>
            <span>$25.00 Flat Rate</span>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl border-b border-gray-100 pb-2">Returns & Exchanges</h2>
        <p className="text-gray-500">
          If you are not completely satisfied with your purchase, you may return it within 30 days of the delivery date. 
          The product must be in its original condition, unworn, and with all tags attached.
        </p>
        <div className="bg-gray-50 p-6 rounded-lg italic text-sm text-gray-600">
          Note: Final sale items, underwear, and accessories are not eligible for returns or exchanges due to hygiene reasons.
        </div>
        <h3 className="text-lg mt-6 text-secondary">How to Return</h3>
        <ol className="text-gray-500">
          <li>Visit our <span className="underline cursor-pointer">Return Portal</span> and enter your order number.</li>
          <li>Select the items you wish to return and the reason.</li>
          <li>Print your prepaid shipping label and drop off the package at any authorized carrier location.</li>
          <li>Refunds will be processed within 5-7 business days of reaching our warehouse.</li>
        </ol>
      </section>
    </div>
  );
}
