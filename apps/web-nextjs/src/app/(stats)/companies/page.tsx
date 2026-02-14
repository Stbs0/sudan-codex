import { getAllCompaniesData } from "@sudan-codex/db";
import { Metadata } from "next";
import Link from "next/link";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "All Pharmaceutical Companies | Sudan Codex",
  description:
    "Browse the complete list of pharmaceutical companies in the Sudan Drug Index. Find manufacturers and suppliers of drugs in Sudan.",
  alternates: {
    canonical: "/companies",
  },
  openGraph: {
    title: "All Pharmaceutical Companies | Sudan Codex",
    description: "Complete list of pharmaceutical companies in Sudan.",
    url: "/companies",
  },
};

export default async function CompaniesIndexPage() {
  const companies = await getAllCompaniesData();

  return (
    <div className='container mx-auto p-4'>
      <h1 className='mb-2 text-3xl font-bold'>Pharmaceutical Companies</h1>
      <p className='text-muted-foreground mb-6 text-lg'>
        Browse all companies in the Sudan Drug Index.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Companies Directory</CardTitle>
          <CardDescription>
            A complete list of registered pharmaceutical companies.
          </CardDescription>
        </CardHeader>
        <div className='p-6 pt-0'>
          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company Name</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {companies.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell>
                      <Link
                        href={`/companies/${company.slug}`}
                        className='hover:underline'>
                        {company.name}
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </Card>
    </div>
  );
}
