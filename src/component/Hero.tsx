import HeroImage from "../photo/Hero.png";

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:p-8 items-center">
        <div className="pt-8 md:pt-20 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold mb-3">We Provide High</h1>

          <h1 className="text-3xl md:text-5xl font-bold">
            Quality
            <span className="text-yellow-500"> Dental </span>
            Services
          </h1>

          <p className="text-gray-500 text-base md:text-lg mt-6 mb-8 md:mb-12">
            Appropriately embrace transparent materials via turnkey niche markets.
          </p>

          <div className="flex gap-4 md:gap-6 justify-center md:justify-start">
            <a href="#appointment" className="bg-[#516EFF] text-white px-6 md:px-8 py-3 md:py-4 rounded-lg text-sm md:text-base">Get Started</a>
            <a href="#about" className="border border-gray-300 px-6 md:px-8 py-3 md:py-4 rounded-lg text-sm md:text-base">Learn More</a>
          </div>
        </div>

        <img src={HeroImage} alt="Hero" className="w-full order-first md:order-last" />
      </div>
    </section>
  );
}