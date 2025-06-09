
import React from 'react';
import MainLayout from '../components/Layout/MainLayout';
import ExpensesList from '../components/Expenses/ExpensesList';

const Expenses: React.FC = () => {
  return (
    <MainLayout>
      <h2 className="text-3xl font-bold mb-6">Despesas</h2>
      <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-md mb-6">
        <h3 className="text-lg font-medium mb-2">Categorização automática</h3>
        <p>
          O app está criando categorias automaticamente com base nas suas mensagens. 
          Veja abaixo todas as suas despesas organizadas por categoria.
        </p>
      </div>
      <ExpensesList />
    </MainLayout>
  );
};

export default Expenses;
