import {
  getTopViewedAgents,
  getTopViewedCompanies,
  getTopViewedDrugs,
  getTopViewedGenerics,
} from "@sudan-codex/db";
import { ChevronRight, Eye } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export async function MostViewedEntities() {
  const [drugs, companies, agents, generics] = await Promise.all([
    getTopViewedDrugs(5),
    getTopViewedCompanies(5),
    getTopViewedAgents(5),
    getTopViewedGenerics(5),
  ]);

  const sections = [
    {
      title: "Top Drugs",
      data: drugs.map((d) => ({
        name: d.brand_name,
        slug: d.slug,
        views: d.view_count || 0,
        href: `/drug-list/${d.slug}`,
        subtitle: d.company_name,
      })),
      href: "/drug-list",
    },
    {
      title: "Top Generics",
      data: generics.map((g) => ({
        name: g.name,
        slug: g.slug,
        views: g.view_count || 0,
        href: `/generics/${g.slug}`,
      })),
      href: "/drug-list",
    },
    {
      title: "Top Companies",
      data: companies.map((c) => ({
        name: c.name,
        slug: c.slug,
        views: c.view_count || 0,
        href: `/companies/${c.slug}`,
      })),
      href: "/drug-list",
    },
    {
      title: "Top Agents",
      data: agents.map((a) => ({
        name: a.name,
        slug: a.slug,
        views: a.view_count || 0,
        href: `/agents/${a.slug}`,
      })),
      href: "/drug-list",
    },
  ];

  return (
    <section className='bg-background py-24'>
      <div className='container mx-auto px-4'>
        <div className='mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end'>
          <div>
            <h2 className='mb-2 text-3xl font-bold'>Trending Content</h2>
            <p className='text-muted-foreground text-lg'>
              Most frequently accessed medications and manufacturers.
            </p>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4'>
          {sections.map((section) => (
            <Card
              key={section.title}
              className='border-muted-foreground/10 flex h-full flex-col'>
              <CardHeader className='pb-4'>
                <CardTitle className='flex items-center justify-between text-xl'>
                  {section.title}
                  <Link
                    href={section.href}
                    className='text-primary text-sm font-normal hover:underline'>
                    View all
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className='grow pt-0'>
                <ul className='space-y-4'>
                  {section.data.map((item, i) => (
                    <li
                      key={item.slug}
                      className='group'>
                      <Link
                        href={item.href}
                        className='hover:bg-muted/50 -mx-2 flex items-start gap-3 rounded-lg p-2 transition-colors'>
                        <span className='text-muted-foreground/20 mt-[-4px] text-2xl font-black'>
                          {i + 1}
                        </span>
                        <div className='min-w-0 grow'>
                          <div className='text-foreground group-hover:text-primary line-clamp-1 font-bold transition-colors'>
                            {item.name}
                          </div>
                          {item.subtitle && (
                            <div className='text-muted-foreground line-clamp-1 text-xs'>
                              {item.subtitle}
                            </div>
                          )}
                          <div className='text-muted-foreground/60 mt-1 flex items-center gap-1 text-[10px] font-medium tracking-wider uppercase'>
                            <Eye size={10} />
                            {item.views.toLocaleString()} views
                          </div>
                        </div>
                        <ChevronRight
                          size={16}
                          className='text-muted-foreground/30 mt-1 opacity-0 transition-opacity group-hover:opacity-100'
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
