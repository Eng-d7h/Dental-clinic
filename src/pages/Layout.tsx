import Navbar from "../component/Navbar";
import Hero from "../component/Hero";
import ServiceSteps from "../component/ServiceSteps";
import Services from "../component/Services";
import AboutUs from "../component/AboutUs";
import Appointment from "../component/Appointment";
import Footer from "../component/Footer";
export default function Layout() {
  return (
    <>
      <Navbar />
      <Hero />
      <ServiceSteps />
      <Services />
      <AboutUs/>
      <Appointment/>
      <Footer/>
    </>
  );
}