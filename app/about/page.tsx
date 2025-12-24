export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen pt-24 pb-12">
       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
         <header className="mb-16 text-center">
           <h1 className="text-4xl font-bold tracking-tight text-secondary mb-6">About Us</h1>
         </header>
 
         <div className="prose prose-lg mx-auto text-gray-600">
           <p className="mb-6">
             We are a minimalist fashion brand dedicated to creating timeless essentials for the modern individual. 
             Our philosophy is simple: quality over quantity, and style that speaks through subtlety.
           </p>
           <p className="mb-6">
             Founded in 2024, we source the finest materials to ensure comfort and durability. 
             Every piece is designed with attention to detail, ensuring it fits seamlessly into your wardrobe.
           </p>
           <h2 className="text-2xl font-bold text-secondary mt-12 mb-6">Our Mission</h2>
           <p>
             To empower individuals to express themselves through understated elegance. We believe that true style 
             comes from confidence and the freedom to be oneself, without the noise of fleeting trends.
           </p>
         </div>
       </div>
    </div>
  );
 }
