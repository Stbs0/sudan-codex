import { Search, ShieldCheck, Smartphone, Zap } from "lucide-react";

const features = [
  {
    title: "Fast Search",
    description:
      "Find any drug, generic name, or manufacturer in seconds with our optimized search engine.",
    icon: Search,
    color: "text-blue-500",
  },
  {
    title: "Accurate Data",
    description:
      "Up-to-date and reliable information sourced from official Sudanese regulatory databases.",
    icon: ShieldCheck,
    color: "text-emerald-500",
  },
  {
    title: "Comprehensive Info",
    description:
      "Detailed drug information including dosage, side effects, and manufacturer details.",
    icon: Zap,
    color: "text-amber-500",
  },
  {
    title: "Mobile Ready",
    description:
      "Access the database on the go with our responsive web app and dedicated mobile application.",
    icon: Smartphone,
    color: "text-purple-500",
  },
];

export function Features() {
  return (
    <section className='bg-background py-24'>
      <div className='container mx-auto px-4 text-center'>
        <h2 className='mb-4 text-3xl font-bold md:text-4xl'>
          Why Choose Sudan Codex?
        </h2>
        <p className='text-muted-foreground mx-auto mb-16 max-w-2xl text-lg'>
          The most reliable drug information platform for healthcare
          professionals in Sudan.
        </p>

        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
          {features.map((feature, index) => (
            <div
              key={index}
              className='bg-muted/50 hover:border-primary/20 hover:bg-card group rounded-2xl border border-transparent p-8 transition-all'>
              <div
                className={`bg-card mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-xl shadow-sm transition-transform group-hover:scale-110 ${feature.color}`}>
                <feature.icon size={28} />
              </div>
              <h3 className='mb-3 text-xl font-bold'>{feature.title}</h3>
              <p className='text-muted-foreground leading-relaxed'>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
