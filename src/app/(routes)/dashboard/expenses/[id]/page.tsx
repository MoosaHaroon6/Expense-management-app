'use client';

import React, { useEffect, useState } from 'react';
import { db } from '../../../../../../utils/dbConfig';
import { Budgets, Expenses } from '../../../../../../utils/schema';
import { eq, sql } from 'drizzle-orm';
import { useUser } from '@clerk/nextjs';
import BudgetItem from '../../budgets/_components/budgetItem';
import AddExpense from '../_components/AddExpense';

interface Budget {
    id: string | number;
    name: string;
    amount: number;
    emoji: string;
    totalSpend: number;
    totalItems: number;
}

interface Props {
    params: {
        id: string;
    };
}

function DisplayExpenses({ params }: Props) {
    const { user } = useUser(); // Clerk user context
    const [budgetInfo, setBudgetInfo] = useState<Budget | null>(null);

    useEffect(() => {
        if (user) fetchBudgetInfo();
    }, [user]);

    const fetchBudgetInfo = async () => {
        const email = user?.primaryEmailAddress?.emailAddress;

        if (email) {
            try {
                const result = await db
                    .select({
                        id: Budgets.id,
                        name: Budgets.name,
                        amount: Budgets.amount,
                        emojiIcon: Budgets.emojiIcon,
                        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
                        totalItems: sql`count(${Expenses.id})`.mapWith(Number),
                    })
                    .from(Budgets)
                    .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
                    .where(
                        sql`${Budgets.createdBy} = ${email} AND ${Budgets.id} = ${params.id}`
                    )
                    .groupBy(Budgets.id);

                const transformedBudget = result.map((budget: any) => ({
                    id: budget.id,
                    name: budget.name,
                    amount: budget.amount,
                    emoji: budget.emojiIcon || '',
                    totalSpend: budget.totalSpend || 0,
                    totalItems: budget.totalItems || 0,
                }))[0];

                setBudgetInfo(transformedBudget || null);
            } catch (error) {
                console.error('Error fetching budget info:', error);
            }
        }
    };

    return (
        <div className="p-10 rounded-lg">
            <h2 className="text-2xl font-bold">My Expenses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-5">
                {budgetInfo ? (
                    <BudgetItem budget={budgetInfo} />
                ) : (
                    <div className="h-[150px] w-full bg-slate-200 rounded-lg animate-pulse"></div>
                )}
                <AddExpense
                    budgetId={params.id}
                    refreshData={fetchBudgetInfo} />
            </div>
        </div>
    );
}

export default DisplayExpenses;
