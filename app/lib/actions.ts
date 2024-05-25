'use server';

import { sql } from "@vercel/postgres";
import { customers } from "./placeholder-data";
import { z } from 'zod';
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(),
    status: z.enum(['paid', 'pending']),
    data: z.string(),
});

const CreateInvoice = FormSchema.omit({
    id: true,
    data: true
});

export async function createInvoice(formData: FormData) {
    const { customerId, amount, status } = CreateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });
    const amountInCents = amount * 100; //convert the amount into cents
    const date = new Date().toISOString().split('T')[0];

    await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;

    // clear this cache and trigger a new request to the server
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}