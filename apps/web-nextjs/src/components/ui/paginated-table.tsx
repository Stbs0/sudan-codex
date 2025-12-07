"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Drug } from "@/db/schema";
import { slugify } from "@/lib/utils";
import { Route } from "next";
import Link from "next/link";
import { useState } from "react";

// T is the type of the item in the items array.
export interface Column<T> {
  header: string;
  accessor: keyof T; // The key in the item object to get the cell value.
  isLink?: boolean; // If true, render the cell as a Next.js Link.
  basePath?: string; // The base path for the link's href.
  slugAccessor?: keyof T; // The key in the item object for the slug part of the href.
}

interface PaginatedTableProps<T> {
  items: T[];
  columns: Column<T>[];
  keyAccessor: keyof T; // The key in the item object to use for the React key prop.
  paginate?: boolean;
}

const ITEMS_PER_PAGE = 10;

export function PaginatedTable<T extends Drug>({
  items,
  columns,
  keyAccessor,
  paginate = true,
}: PaginatedTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const currentItems =
    paginate && items.length > ITEMS_PER_PAGE
      ? items.slice(
          (currentPage - 1) * ITEMS_PER_PAGE,
          currentPage * ITEMS_PER_PAGE
        )
      : items;

  return (
    <div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.header}>{column.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((item) => (
              <TableRow key={String(item[keyAccessor])}>
                {columns.map((column) => (
                  <TableCell key={column.header}>
                    {column.isLink && column.basePath && column.slugAccessor ? (
                      <Link
                        href={
                          `${column.basePath}${slugify(
                            item[column.slugAccessor] as string
                          )}` as Route
                        }
                        className='hover:underline'>
                        {String(item[column.accessor])}
                      </Link>
                    ) : (
                      String(item[column.accessor])
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {paginate && items.length > ITEMS_PER_PAGE && (
        <div className='flex items-center justify-end space-x-2 py-4'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}>
            Previous
          </Button>
          <span className='text-sm'>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant='outline'
            size='sm'
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}>
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
