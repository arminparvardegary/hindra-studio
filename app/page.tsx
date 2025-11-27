import NavBar from "@/components/NavBar";
import Header from "@/components/Header";
import Hero from "@/components/index/Hero";
import Showcase from "@/components/index/ShowCase";
import ServicesPicker from "@/components/index/ServicesPicker";
import Whyus from "@/components/index/WhyUs";
import Scrolltext from "@/components/index/ScrollText";
import Testimonial from "@/components/index/Testimonial";
import Built from "@/components/index/Built";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-white overflow-x-hidden">
      <Header />
      <Hero />
      <Showcase />
      <ServicesPicker />
      <Whyus />
      <Scrolltext />
      <Testimonial />
      <Built />
      <Footer />
      <NavBar />
    </main>
  );
}
