
import React from 'react';
import MainLayout from '../components/Layout/MainLayout';
import ExpensesList from '../components/Expenses/ExpensesList';

const Expenses: React.FC = () => {
  return (
    <MainLayout>
      <h2 className="text-3xl font-bold mb-6">Despesas</h2>
      <ExpensesList />
    </MainLayout>
  );
};

export default Expenses;
