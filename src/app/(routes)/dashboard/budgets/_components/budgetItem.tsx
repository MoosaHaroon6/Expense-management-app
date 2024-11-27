import React from 'react';

interface BudgetItemProps {
    budget: {
        id: string;
        name: string;
        amount: number;
        emoji: string;
        totalItem: string;
        totalSpend: number;
    };
}

function BudgetItem({ budget }: BudgetItemProps) {
    return (
        <div className='p-5 border rounded-lg gap-2 hover:shadow-md cursor-pointer'>
            <div className='flex gap-2 items-center justify-between'>
                <div className='flex gap-2 items-center'>
                    <h1 className='text-3xl p-2 bg-gray-300 rounded-full'>{budget.emoji}</h1>
                    <div>
                        <h2>{budget.name}</h2>
                        <h2 className='text-sm text-gray-400'>0{budget.totalItem}Item</h2>
                    </div>
                    <h2 className='text-primary font-bold'>${budget.amount}</h2>
                </div>
            </div>

            <div className='mt-5'>
                <div className='flex items-center justify-between mb-2'>
                    <h2 className='text-xs text-slate-400'>${budget.totalSpend ? budget.totalSpend : 0} spend</h2>
                    <h2 className='text-xs text-slate-400'>{budget.amount - budget.totalSpend}remaining</h2>
                </div>
                <div className='w-full bg-purple-200 h-2 rounded-full'>
                    <div className='w-[40%] bg-primary h-2 rounded-full'></div>
                </div>
            </div>

        </div>
    );
}

export default BudgetItem;
