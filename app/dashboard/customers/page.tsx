import { fetchFilteredCustomers } from "@/app/lib/data";
import CustomersTable from "@/app/ui/customers/table";
import { lusitana } from "@/app/ui/fonts";
import { CreateCustomer } from "@/app/ui/invoices/buttons";
import Search from "@/app/ui/search";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: 'Customers',
};

export default async function Page({ searchParams, }: { searchParams?: { query?: string, page?: string }; }) {
    const query = searchParams?.query || '';
    const customers = await fetchFilteredCustomers(query);;

    return (
        <Suspense>
            <CustomersTable customers={customers} />
        </Suspense>
    );
}