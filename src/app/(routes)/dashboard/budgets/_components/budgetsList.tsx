'use client';

import React, { useEffect, useState } from 'react';
import CreateBudgets from './CreateBudgets';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig';
import BudgetItem from './budgetItem';

interface Budget {
  id: string;
  name: string;
  amount: number;
  emoji: string;
  totalSpend: number;
  totalItem: string
}

function BudgetsList() {
  const [budgets, setBudgets] = useState<Budget[]>([]);

  const getBudgetList = async () => {
    try {
      const budgetsCollection = collection(db, "budgets");
      const budgetSnapshot = await getDocs(budgetsCollection);
      const budgetList = budgetSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Budget[];

      setBudgets(budgetList);
    } catch (error) {
      console.error("Error fetching budgets: ", error);
    }
  };

  useEffect(() => {
    getBudgetList();
  }, []);

  return (
    <div className='mt-7'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <CreateBudgets />
        {budgets.map((budget) => (
          <BudgetItem key={budget.id} budget={budget} />
        ))}
      </div>
    </div>
  );
}

export default BudgetsList;
