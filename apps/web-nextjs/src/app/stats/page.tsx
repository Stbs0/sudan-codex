import {
  Card,
  CardContent,
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
import agentCompanyAssociations from "@/data/stats/agent-company-associations.json";
import agents from "@/data/stats/agents.json";
import brands from "@/data/stats/brands.json";
import companies from "@/data/stats/companies.json";
import companyAgentAssociations from "@/data/stats/company-agent-associations.json";
import generics from "@/data/stats/generics.json";
import summary from "@/data/stats/summary.json";
import { slugify } from "@/lib/utils";
import { getAllDrugs } from "@/services/server/getDrugs";
import { Metadata, Route } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Drug Statistics",
  description: "Statistics about the drugs in the Sudan Drug Index.",
};

export default async function StatsPage() {
  const allDrugs = await getAllDrugs();
  return (
    <div className='container mx-auto p-4'>
      <h1 className='mb-4 text-3xl font-bold'>Drug Statistics</h1>

      <div className='mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <Card>
          <CardHeader>
            <CardTitle>Total Drugs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>
              {summary.totalEntries.toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Unique Companies</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>
              {summary.totalUniqueCompanies.toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Unique Brand Names</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>
              {summary.totalUniqueBrandNames.toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Unique Generic Names</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>
              {summary.totalUniqueGenericNames.toLocaleString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Unique Agents</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-2xl font-bold'>
              {summary.totalUniqueAgents.toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className='mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>Top Companies by Brand Names</CardTitle>
            <CardDescription>
              Companies with the most brand names.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className='bg-secondary'>
                  <TableHead>Company</TableHead>
                  <TableHead className='text-right'>Brand Names</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {companies.slice(0, 10).map((company) => (
                  <TableRow key={company.name}>
                    <TableCell>
                      <Link
                        href={`/stats/company/${company.slug}`}
                        className='hover:underline'>
                        {company.name}
                      </Link>
                    </TableCell>
                    <TableCell className='text-right'>
                      {company.numberOfBrandNames}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Agents by Drug Count</CardTitle>
            <CardDescription>
              Agents associated with the most drugs.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className='bg-secondary'>
                  <TableHead>Agent</TableHead>
                  <TableHead className='text-right'>Drugs</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agents.slice(0, 10).map((agent) => (
                  <TableRow key={agent.name}>
                    <TableCell>
                      {agent.name ? (
                        <Link
                          href={`/stats/agent/${agent.slug}`}
                          className='hover:underline'>
                          {agent.name}
                        </Link>
                      ) : (
                        "N/A"
                      )}
                    </TableCell>
                    <TableCell className='text-right'>
                      {agent.numberOfDrugs}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Generic Names by Drug Count</CardTitle>
            <CardDescription>
              Generic names associated with the most drugs.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className='bg-secondary'>
                  <TableHead>Generic Name</TableHead>
                  <TableHead className='text-right'>Drugs</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {generics.slice(0, 10).map((generic) => (
                  <TableRow key={generic.name}>
                    <TableCell>
                      {generic.name ? (
                        <Link
                          href={`/stats/generic/${generic.slug}`}
                          className='hover:underline'>
                          {generic.name}
                        </Link>
                      ) : (
                        "N/A"
                      )}
                    </TableCell>
                    <TableCell className='text-right'>
                      {generic.numberOfDrugs}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Most Frequent Brand Names</CardTitle>
            <CardDescription>
              Brand names that appear most frequently.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className='bg-secondary'>
                  <TableHead>Brand Name</TableHead>
                  <TableHead className='text-right'>Count</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {brands.slice(0, 10).map((brand) => (
                  <TableRow key={brand.name}>
                    <TableCell>
                      {brand.name ? (
                        <Link
                          href={
                            `/drug-list/${allDrugs.find((drug) => drug)}` as Route
                          }
                          className='hover:underline'>
                          {brand.name}
                        </Link>
                      ) : (
                        "N/A"
                      )}
                    </TableCell>
                    <TableCell className='text-right'>
                      {brand.numberOfDrugs}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle>Agents and their Associated Companies</CardTitle>
            <CardDescription>
              Listing agents and the companies they work with (top 10 agents).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className='bg-secondary'>
                  <TableHead>Brand Name</TableHead>
                  <TableHead className='text-right'>Count</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agentCompanyAssociations
                  .toSorted((a, b) => b.companies.length - a.companies.length)

                  .slice(0, 10)
                  .map((agent) => (
                    <TableRow key={agent.agentName}>
                      <TableCell>
                        {agent.agentName ? (
                          <Link
                            href={
                              `/stats/brand/${slugify(agent.agentName)}` as Route
                            }
                            className='hover:underline'>
                            {agent.agentName}
                          </Link>
                        ) : (
                          "N/A"
                        )}
                      </TableCell>
                      <TableCell className='text-right'>
                        {agent.companies.length}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Companies and their Associated Agents</CardTitle>
            <CardDescription>
              Listing companies and the agents they work with (top 10
              companies).
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className='bg-secondary'>
                  <TableHead>Brand Name</TableHead>
                  <TableHead className='text-right'>Count</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {companyAgentAssociations
                  .toSorted((a, b) => b.agents.length - a.agents.length)

                  .slice(0, 10)
                  .map((company) => (
                    <TableRow key={company.companyName}>
                      <TableCell>
                        {company.companyName ? (
                          <Link
                            href={
                              `/stats/brand/${slugify(company.companyName)}` as Route
                            }
                            className='hover:underline'>
                            {company.companyName}
                          </Link>
                        ) : (
                          "N/A"
                        )}
                      </TableCell>
                      <TableCell className='text-right'>
                        {company.agents.length}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
