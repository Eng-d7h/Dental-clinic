import Logo from "../photo/Logo.png";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">

        {/* Logo */}

        <div>

          <img
            src={Logo}
            alt="Logo"
            className="w-40 mb-5"
          />

          <p className="text-gray-400 leading-8">
            We provide professional dental care with
            experienced dentists and modern technology
            for a healthy smile.
          </p>

        </div>

        {/* Quick Links */}

        <div>

          <h3 className="text-2xl font-semibold mb-5">
            Quick Links
          </h3>

          <ul className="space-y-3 text-gray-400">

            <li>
              <a href="#">Home</a>
            </li>

            <li>
              <a href="#services">Services</a>
            </li>

            <li>
              <a href="#about">About Us</a>
            </li>

            <li>
              <a href="#appointment">
                Appointment
              </a>
            </li>

          </ul>

        </div>

        {/* Contact */}

        <div>

          <h3 className="text-2xl font-semibold mb-5">
            Contact
          </h3>

          <div className="space-y-4 text-gray-400">

            <div className="flex items-center gap-3">
              <Phone size={20} />
              <span>+966 500 000 000</span>
            </div>

            <div className="flex items-center gap-3">
              <Mail size={20} />
              <span>info@dentics.com</span>
            </div>

            <div className="flex items-center gap-3">
              <MapPin size={20} />
              <span>Riyadh, Saudi Arabia</span>
            </div>

          </div>

        </div>

      </div>

      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-500">
        © 2025 Dentics. All Rights Reserved.
      </div>

    </footer>
  );
}