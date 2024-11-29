'use client';

import { useUser } from "@clerk/nextjs";
import { getTableColumns, sql, eq, desc } from "drizzle-orm";
import { db } from "../../../../utils/dbConfig";
import { Budgets, Expenses } from "../../../../utils/schema";
import { useEffect, useState } from "react";
import CardInfo from "./_components/CardInfo";
import BarChartDashBoard from "./_components/barChartDashBoard";

interface Budget {
    id: string | number;
    name: string;
    amount: number;
    emoji: string;
    totalSpend: number;
    totalItems: number;
}

export default function Dashboard() {
    const { user } = useUser();
    const [budgets, setBudgets] = useState<Budget[]>([]);

    useEffect(() => {
        user && fetchBudgets();
    }, [user]);


    const fetchBudgets = async () => {
        const email = user?.primaryEmailAddress?.emailAddress;

        if (email) {
            const result = await db.select({
                ...getTableColumns(Budgets),
                totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
                totalItem: sql`count(${Expenses.id})`.mapWith(Number),
            })
                .from(Budgets)
                .where(eq(Budgets.createdBy, email))
                .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
                .groupBy(Budgets.id)
                .orderBy(desc(Budgets.id));

            const transformedBudgets = result.map((budget: any) => ({
                id: budget.id,
                name: budget.name,
                amount: budget.amount,
                emoji: budget.emojiIcon || '',
                totalSpend: budget.totalSpend || 0,
                totalItems: budget.totalItems || 0,
            }));

            setBudgets(transformedBudgets || [])
        }
    };
    return (
        <div className="mr-10 p-5">
            <h1 className="font-bold text-3xl">Hey!{user?.fullName} 👋</h1>
            <p>Let's lookup your money!</p>
            <CardInfo
                budgetList={budgets}
            />
            <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="col-span-2">
                    <BarChartDashBoard
                        budgetList={budgets}
                    />
                </div>
                <div>Other Content</div>
            </div>
        </div>
    )
}

