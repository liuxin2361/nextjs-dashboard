import { lusitana } from '@/app/ui/fonts';
import { fetchRevenue, fetchLatestInvoices } from '@/app/lib/data';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';

export default async function Page() {
    const revenue = await fetchRevenue();
    const latestInvoices = await fetchLatestInvoices();
    return (
        <main>
            <h1 className={'${lusitana.className}} mb-4 text-x1 md:text-2x1'}>
                Dashboard
            </h1>
            <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'></div>
            <div className='mt-6 grid grid-cols-1 gap-6 sm:grid-cols-4 lg:grid-cols-8'>
                {<RevenueChart revenue={revenue} />}
                {<LatestInvoices latestInvoices={latestInvoices} />}
            </div>
        </main>
    )
}