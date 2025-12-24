"use client";

export function AnnouncementBar() {
  return (
    <div className="bg-black text-white text-xs font-bold tracking-widest py-2 overflow-hidden relative z-[60] flex w-full max-w-full">
      <div className="flex animate-marquee whitespace-nowrap shrink-0">
        <span className="mx-8">FREE SHIPPING ON ALL ORDERS OVER $150</span>
        <span className="mx-8">NEW COLLECTION DROPPING SOON</span>
        <span className="mx-8">WORLDWIDE SHIPPING AVAILABLE</span>
        <span className="mx-8">FREE SHIPPING ON ALL ORDERS OVER $150</span>
        <span className="mx-8">NEW COLLECTION DROPPING SOON</span>
        <span className="mx-8">WORLDWIDE SHIPPING AVAILABLE</span>
      </div>
      <div className="flex animate-marquee whitespace-nowrap shrink-0" aria-hidden="true">
        <span className="mx-8">FREE SHIPPING ON ALL ORDERS OVER $150</span>
        <span className="mx-8">NEW COLLECTION DROPPING SOON</span>
        <span className="mx-8">WORLDWIDE SHIPPING AVAILABLE</span>
        <span className="mx-8">FREE SHIPPING ON ALL ORDERS OVER $150</span>
        <span className="mx-8">NEW COLLECTION DROPPING SOON</span>
        <span className="mx-8">WORLDWIDE SHIPPING AVAILABLE</span>
      </div>
    </div>
  );
}
