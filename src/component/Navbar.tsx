import { useState } from "react";
import Logo from "../photo/Logo.png";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="max-w-7xl mx-auto px-4 py-6 border-b border-gray-200">
      <div className="flex justify-between items-center">
        <img src={Logo} alt="Logo" className="w-32 md:w-40" />

        <ul className="hidden md:flex gap-8 text-gray-500">
          <li>
            <a href="#home" className="text-gray-500 hover:text-[#516EFF] duration-300">
              Home
            </a>
          </li>

          <li>
            <a href="#services" className="text-gray-500 hover:text-[#516EFF] duration-300">
              Services
            </a>
          </li>

          <li>
            <a href="#about" className="text-gray-500 hover:text-[#516EFF] duration-300">
              About us
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-4">
          <a className="hidden sm:block bg-[#516EFF] text-white px-6 md:px-8 py-2.5 md:py-3 rounded-lg text-sm md:text-base" href="#appointment">
            Appointment
          </a>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-2xl">
            ☰
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <ul className="md:hidden flex flex-col gap-4 mt-4 pb-2 text-gray-500">
          <li>
            <a href="#home" onClick={() => setIsMenuOpen(false)} className="block hover:text-[#516EFF] duration-300">
              Home
            </a>
          </li>

          <li>
            <a href="#services" onClick={() => setIsMenuOpen(false)} className="block hover:text-[#516EFF] duration-300">
              Services
            </a>
          </li>

          <li>
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="block hover:text-[#516EFF] duration-300">
              About us
            </a>
          </li>

          <li>
            <a href="#appointment" onClick={() => setIsMenuOpen(false)} className="block bg-[#516EFF] text-white text-center px-6 py-2.5 rounded-lg">
              Appointment
            </a>
          </li>
        </ul>
      )}
    </nav>
  );
}