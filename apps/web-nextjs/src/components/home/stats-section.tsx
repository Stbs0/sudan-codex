import { getLandingPageStats } from "@sudan-codex/db";
import { Building2, Factory, Pill, Users } from "lucide-react";

export async function StatsSection() {
  const stats = await getLandingPageStats();

  const statItems = [
    {
      label: "Drugs",
      value: stats.drugs.toLocaleString(),
      icon: Pill,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Companies",
      value: stats.companies.toLocaleString(),
      icon: Factory,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      label: "Agents",
      value: stats.agents.toLocaleString(),
      icon: Building2,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      label: "Generics",
      value: stats.generics.toLocaleString(),
      icon: Users,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ];

  return (
    <section className='bg-muted/30 py-20'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-2 gap-8 md:grid-cols-4'>
          {statItems.map((item, index) => (
            <div
              key={index}
              className='bg-card flex flex-col items-center rounded-2xl border p-6 shadow-sm transition-all hover:shadow-md'>
              <div
                className={`rounded-full p-4 ${item.bgColor} ${item.color} mb-4`}>
                <item.icon size={32} />
              </div>
              <div className='mb-1 text-3xl font-bold'>{item.value}+</div>
              <div className='text-muted-foreground font-medium'>
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
