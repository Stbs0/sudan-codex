import { getAllAgentsData } from "@sudan-codex/db";
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
  title: "All Pharmaceutical Agents | Sudan Codex",
  description:
    "Browse the complete list of pharmaceutical agents in the Sudan Drug Index. Find detailed information on agents representing drug manufacturers and distributors.",
  alternates: {
    canonical: "/agents",
  },
  openGraph: {
    title: "All Pharmaceutical Agents | Sudan Codex",
    description: "Complete list of pharmaceutical agents in Sudan.",
    url: "/agents",
  },
};

export default async function AgentsIndexPage() {
  const agents = await getAllAgentsData();

  return (
    <div className='container mx-auto p-4'>
      <h1 className='mb-2 text-3xl font-bold'>Pharmaceutical Agents</h1>
      <p className='text-muted-foreground mb-6 text-lg'>
        Browse all agents in the Sudan Drug Index.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Agents Directory</CardTitle>
          <CardDescription>
            A complete list of registered agents.
          </CardDescription>
        </CardHeader>
        <div className='p-6 pt-0'>
          <div className='rounded-md border'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Agent Name</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agents.map((agent) => (
                  <TableRow key={agent.id}>
                    <TableCell>
                      <Link
                        href={`/agents/${agent.slug}`}
                        className='hover:underline'>
                        {agent.name}
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
