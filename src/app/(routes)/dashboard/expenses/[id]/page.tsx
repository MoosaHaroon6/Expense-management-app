'use client';

import React, { useEffect, useState } from 'react';
import { db } from '@/firebase/firebaseConfig';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';

interface Budget {
  id: string;
  name: string;
  amount: number;
  emoji: string;
  createdAt: Date;
}

function Expenses({ params }: { params: { id: string } }) {
  const [budget, setBudget] = useState<Budget | null>(null);

  const getBudgetInfo = async () => {
    try {
      const budgetDocRef = doc(db, "budgets", params.id);
      const budgetSnapshot = await getDoc(budgetDocRef);

      if (budgetSnapshot.exists()) {
        const budgetData = { id: budgetSnapshot.id, ...budgetSnapshot.data() } as Budget;
        setBudget(budgetData);
      } else {
        console.error("No budget found with the provided ID.");
      }
    } catch (error) {
      console.error("Error fetching budget details: ", error);
    }
  };

  useEffect(() => {
    if (params.id) {
      getBudgetInfo();
    }
  }, [params.id]);

  return (
    <div className='p-10'>
      {budget ? (
        <div>
          <h2 className='text-3xl font-bold'>{budget.name}</h2>
          <p className='text-xl mt-4'>Amount: ${budget.amount}</p>
          <p className='text-xl mt-4'>Emoji: {budget.emoji}</p>
          <p className='text-sm mt-4'>Created At: {budget.createdAt.toString()}</p>
        </div>
      ) : (
        <p>Loading budget details...</p>
      )}
    </div>
  );
}

export default Expenses;
