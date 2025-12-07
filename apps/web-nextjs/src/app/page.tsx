import { Hero } from "@/components/home/hero";
import { layoutJsonLd } from "@/lib/json-ld";

const Home = () => {
  return (
    <div className='flex h-full flex-col'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(layoutJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />
    </div>
  );
};

export default Home;
