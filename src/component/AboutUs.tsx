import {
  CheckCircle,
  Users,
  Smile,
  Clock,
  Award,
} from "lucide-react";

export default function AboutUs() {
  const features = [
    "Modern Technology",
    "Friendly Environment",
    "Experienced Dentists",
  ];

  const stats = [
    {
      number: "10+",
      title: "Years Experience",
    },
    {
      number: "5000+",
      title: "Happy Patients",
    },
    {
      number: "15+",
      title: "Expert Doctors",
    },
  ];

  const cards = [
    {
      icon: <Smile size={40} />,
      title: "Friendly Care",
      description:
        "Our team treats every patient with kindness and respect.",
    },
    {
      icon: <Users size={40} />,
      title: "Modern Clinic",
      description:
        "Equipped with the latest dental technology.",
    },
    {
      icon: <Clock size={40} />,
      title: "Quick Service",
      description:
        "Fast appointments with professional treatment.",
    },
    {
      icon: <Award size={40} />,
      title: "Best Quality",
      description:
        "We always deliver high-quality dental care.",
    },
  ];

  return (
    <section id="about" className="max-w-7xl mx-auto py-12 md:py-24 px-4 md:px-6">
      {/* Hero */}
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">

        {/* Left */}
        <div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
  About Our Clinic
</h2>

          <p className="text-gray-500 text-lg leading-8 mt-6">
            We are committed to providing high-quality dental care
            using modern technology and experienced professionals.
            Our goal is to make every patient leave with a healthy
            and confident smile.
          </p>

          <div className="space-y-5 mt-8">
            {features.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-3"
              >
                <CheckCircle className="text-[#516EFF]" />

                <span className="text-lg font-medium">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="bg-[#516EFF] rounded-3xl p-6 md:p-10 text-white">
          <h3 className="text-3xl font-bold mb-8">
            Our Mission
          </h3>

          <p className="leading-8 text-gray-100">
            We strive to provide safe, comfortable, and
            professional dental care for every patient by
            combining advanced equipment with compassionate
            treatment.
          </p>

          <div className="grid grid-cols-3 gap-6 mt-10">
            {stats.map((item, index) => (
              <div
                key={index}
                className="text-center"
              >
                <h4 className="text-3xl font-bold">
                  {item.number}
                </h4>

                <p className="mt-2 text-gray-100">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Patients Trust Us */}
      <div className="mt-24">

        <h2 className="text-2xl md:text-4xl font-bold text-center">
  Why Patients Trust Us
</h2>

        <p className="text-center text-gray-500 mt-4">
          We combine experience, technology, and patient care
          to deliver the best dental experience.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">

          {cards.map((card, index) => (
            <div
              key={index}
              className="border rounded-2xl p-8 text-center hover:shadow-xl hover:-translate-y-2 duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-[#516EFF]/10 text-[#516EFF] flex items-center justify-center mx-auto">
                {card.icon}
              </div>

              <h3 className="text-xl font-semibold mt-6">
                {card.title}
              </h3>

              <p className="text-gray-500 mt-4 leading-7">
                {card.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}