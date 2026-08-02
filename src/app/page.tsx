import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import CoreServices from "@/components/sections/CoreServices";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CoreServices />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}