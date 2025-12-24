"use client";

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-secondary">Contact Us</h1>
        <p className="text-gray-500 text-lg">We're here to help. Reach out with any questions or feedback.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Info */}
        <div className="space-y-8">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-accent mb-2">Customer Service</h3>
            <p className="text-secondary font-medium italic">Available Monday - Friday, 9am - 5pm EST</p>
          </div>
          
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-2">Email</h3>
            <p className="text-secondary">support@muse.com</p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-2">Social</h3>
            <div className="flex space-x-4 text-secondary">
              <span className="hover:text-accent cursor-pointer underline decoration-dotted underline-offset-4">Instagram</span>
              <span className="hover:text-accent cursor-pointer underline decoration-dotted underline-offset-4">TikTok</span>
              <span className="hover:text-accent cursor-pointer underline decoration-dotted underline-offset-4">Twitter</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Message sent! (Mock)'); }}>
          <div>
            <label className="block text-sm font-bold uppercase tracking-widest mb-2">Name</label>
            <input 
              type="text" 
              className="w-full border-b border-gray-200 py-2 focus:border-black outline-none transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold uppercase tracking-widest mb-2">Email</label>
            <input 
              type="email" 
              className="w-full border-b border-gray-200 py-2 focus:border-black outline-none transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold uppercase tracking-widest mb-2">Message</label>
            <textarea 
              rows={4}
              className="w-full border-b border-gray-200 py-2 focus:border-black outline-none resize-none transition-colors"
              required
            ></textarea>
          </div>
          <button 
            type="submit"
            className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest hover:bg-gray-900 transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
