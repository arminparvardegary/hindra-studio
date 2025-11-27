import NavBar from "@/components/NavBar";
import Header from "@/components/Header";
import Hero from "@/components/index/Hero";
import Showcase from "@/components/index/ShowCase";
import Works from "@/components/index/Works";
import Services from "@/components/index/Services";
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
      <Works />
      <Services />
      <Whyus />
      <Scrolltext />
      <Testimonial />
      <Built />
      <Footer />
      <NavBar />
    </main>
  );
}
