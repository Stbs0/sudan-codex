import { getAllGenericsData } from "@sudan-codex/db";
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

export const revalidate = false;

export const metadata: Metadata = {
  title: "All Generic Drugs | Sudan Codex",
  description:
    "Browse the complete list of generic drugs in the Sudan Drug Index. Find information on active ingredients and their availability.",
  alternates: {
    canonical: "/generics",
  },
  openGraph: {
    title: "All Generic Drugs | Sudan Codex",
    description: "Complete list of generic drugs in Sudan.",
    url: "/generics",
  },
};

export default async function GenericsIndexPage() {
  const generics = await getAllGenericsData();

  return (
    <div className='container mx-auto p-4'>
      <h1 className='mb-2 text-3xl font-bold'>Generic Drugs</h1>
      <p className='text-muted-foreground mb-6 text-lg'>
        Browse all generic drug names in the Sudan Drug Index.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Generics Directory</CardTitle>
          <CardDescription>A complete list of generic drugs.</CardDescription>
        </CardHeader>
        <div className='p-6 pt-0'>
          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Generic Name</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {generics.map((generic) => (
                  <TableRow key={generic.id}>
                    <TableCell>
                      <Link
                        href={`/generics/${generic.slug}`}
                        className='hover:underline'>
                        {generic.name}
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
