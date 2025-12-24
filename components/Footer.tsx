"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-secondary text-primary pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold tracking-tight">MUSE<span className="text-accent">.</span></h3>
            <p className="text-gray-400 text-sm">
              Premium essentials for the modern minimalist. 
              Designed with focus and precision.
            </p>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Explore</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/shop" className="hover:text-white transition-colors">Shop All</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Our Story</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Get in Touch</Link></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Stay Connected</h4>
            <div className="space-y-4">
              <p className="text-gray-400 text-xs leading-relaxed">
                Be the first to hear about new drops and exclusive offers.
              </p>
              <form 
                className="flex gap-2" 
                onSubmit={(e) => { 
                  e.preventDefault(); 
                  const target = e.target as HTMLFormElement;
                  const button = target.querySelector('button');
                  if (button) {
                    button.innerText = 'Joined ✓';
                    button.classList.add('bg-green-600');
                    target.querySelector('input')?.setAttribute('disabled', 'true');
                  }
                }}
              >
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-zinc-900 border border-zinc-800 text-white px-4 py-3 rounded-md w-full focus:outline-none focus:border-accent text-sm transition-all disabled:opacity-50"
                  required
                />
                <button className="bg-accent text-white px-6 py-3 rounded-md text-sm font-bold uppercase tracking-widest hover:opacity-90 transition-all active:scale-95 shrink-0">
                  Join
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-zinc-800 text-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Muse Storefront. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
