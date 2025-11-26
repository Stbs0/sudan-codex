import { Hero } from "@/components/home/hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

const Home = () => {
  return (
    <div className='flex h-full flex-col'>
      <Hero />
    </div>
  );
};

export default Home;
