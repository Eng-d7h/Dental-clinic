import {
  Sparkles,
  Smile,
  ShieldPlus,
  HeartPulse,
  Baby,
  Stethoscope,
  Check,
} from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: <Sparkles size={40} />,
      title: "Teeth Cleaning",
      description: "Professional cleaning to keep your teeth healthy and bright.",
    },
    {
      icon: <Smile size={40} />,
      title: "Teeth Whitening",
      description: "Safe whitening treatment for a beautiful white smile.",
    },
    {
      icon: <ShieldPlus size={40} />,
      title: "Dental Implants",
      description: "Permanent solution for replacing missing teeth.",
    },
    {
      icon: <Stethoscope size={40} />,
      title: "Orthodontics",
      description: "Straighten your teeth with modern braces.",
    },
    {
      icon: <Baby size={40} />,
      title: "Pediatric Dentistry",
      description: "Special dental care for children of all ages.",
    },
    {
      icon: <HeartPulse size={40} />,
      title: "Root Canal",
      description: "Effective treatment to save damaged teeth.",
    },
  ];

  const features = [
    "Experienced Dentists",
    "Modern Equipment",
    "Emergency Care",
    "Affordable Prices",
  ];

  return (
    <section className="max-w-7xl mx-auto py-12 md:py-20 px-4 md:px-6" id="services">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
          Our Dental Services
        </h2>

        <p className="text-gray-500 mt-5 text-lg max-w-2xl mx-auto">
          We provide complete dental care using the latest technology to keep
          your smile healthy and beautiful.
        </p>
      </div>

      {/* Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 duration-300"
          >
            <div className="w-16 h-16 rounded-full bg-[#516EFF]/10 text-[#516EFF] flex items-center justify-center">
              {service.icon}
            </div>

            <h3 className="text-2xl font-semibold mt-6">
              {service.title}
            </h3>

            <p className="text-gray-500 mt-4 leading-7">
              {service.description}
            </p>
          </div>
        ))}
      </div>

      {/* Why Choose Us */}
      <div className="mt-24 bg-[#F8FAFF] rounded-3xl p-10">
        <h2 className="text-4xl font-bold text-center">
          Why Choose Us?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-4 bg-white rounded-xl p-5 shadow-sm"
            >
              <div className="w-10 h-10 rounded-full bg-[#516EFF] text-white flex items-center justify-center">
                <Check size={20} />
              </div>

              <span className="text-lg font-medium">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}