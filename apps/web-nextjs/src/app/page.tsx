import { CTASection } from "@/components/home/cta-section";
import { Features } from "@/components/home/features";
import { Hero } from "@/components/home/hero";
import { MostViewedEntities } from "@/components/home/most-viewed-sections";
import { StatsSection } from "@/components/home/stats-section";
import { generateMobileAppJsonLd, layoutJsonLd } from "@/lib/json-ld";

const Home = () => {
  const mobileAppJsonLd = generateMobileAppJsonLd();

  return (
    <div className='flex h-full flex-col'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([layoutJsonLd, mobileAppJsonLd]).replace(
            /</g,
            "\\u003c"
          ),
        }}
      />
      <Hero />
      <StatsSection />
      <Features />
      <MostViewedEntities />
      <CTASection />
    </div>
  );
};

export default Home;
