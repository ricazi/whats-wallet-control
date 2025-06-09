
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ArrowUpRight, 
  ShoppingCart,
  Car,
  Home,
  Film,
  Heart,
  BookOpen,
  MoreHorizontal
} from 'lucide-react';
import { mockTransactions, mockMonthlySummary } from '../../data/mockData';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const categoryIcons = {
  food: <ShoppingCart className="h-4 w-4" />,
  transport: <Car className="h-4 w-4" />,
  housing: <Home className="h-4 w-4" />,
  entertainment: <Film className="h-4 w-4" />,
  health: <Heart className="h-4 w-4" />,
  education: <BookOpen className="h-4 w-4" />,
  others: <MoreHorizontal className="h-4 w-4" />
};

const categoryColors = {
  food: '#FF9F1C',
  transport: '#2EC4B6',
  housing: '#E71D36',
  entertainment: '#7209B7',
  health: '#4CC9F0',
  education: '#4361EE',
  others: '#B5B5B5',
};

const FinanceDashboard = () => {
  const [timeFrame, setTimeFrame] = useState<'daily' | 'weekly' | 'monthly'>('monthly');

  const { income, expenses, balance, categorySummary } = mockMonthlySummary;
  const recentTransactions = [...mockTransactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  // Dados para o gráfico de pizza
  const pieChartData = categorySummary.map(cat => ({
    name: cat.category,
    value: cat.amount
  }));

  // Dados para o gráfico de barras
  const barChartData = [
    { name: 'Receitas', valor: income },
    { name: 'Despesas', valor: expenses },
    { name: 'Saldo', valor: balance }
  ];

  // Função para formatar valores monetários
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Dashboard Financeiro</h2>
        <div className="flex gap-2">
          <button 
            className={`px-3 py-1 rounded-full text-sm ${
              timeFrame === 'daily' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setTimeFrame('daily')}
          >
            Dia
          </button>
          <button 
            className={`px-3 py-1 rounded-full text-sm ${
              timeFrame === 'weekly' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setTimeFrame('weekly')}
          >
            Semana
          </button>
          <button 
            className={`px-3 py-1 rounded-full text-sm ${
              timeFrame === 'monthly' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setTimeFrame('monthly')}
          >
            Mês
          </button>
        </div>
      </div>

      {/* Cards do resumo financeiro */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-gray-500">Receitas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="mr-4 rounded-full bg-green-100 p-2">
                <TrendingUp className="h-6 w-6 text-income" />
              </div>
              <div>
                <div className="text-2xl font-bold">{formatCurrency(income)}</div>
                <p className="text-xs text-gray-500">Abril 2025</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-gray-500">Despesas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="mr-4 rounded-full bg-red-100 p-2">
                <TrendingDown className="h-6 w-6 text-expense" />
              </div>
              <div>
                <div className="text-2xl font-bold">{formatCurrency(expenses)}</div>
                <p className="text-xs text-gray-500">Abril 2025</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium text-gray-500">Saldo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="mr-4 rounded-full bg-blue-100 p-2">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">{formatCurrency(balance)}</div>
                <p className="text-xs text-gray-500">Abril 2025</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Distribuição de Despesas</CardTitle>
            <CardDescription>Por categoria em Abril 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={categoryColors[entry.name]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => formatCurrency(Number(value))}
                    labelFormatter={(index) => {
                      const item = pieChartData[index];
                      return item ? item.name.charAt(0).toUpperCase() + item.name.slice(1) : '';
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Balanço Financeiro</CardTitle>
            <CardDescription>Abril 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Legend />
                  <Bar 
                    dataKey="valor" 
                    name="Valor" 
                    fill="#3B82F6"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Categorias */}
      <Card>
        <CardHeader>
          <CardTitle>Despesas por Categoria</CardTitle>
          <CardDescription>Detalhamento do mês atual</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categorySummary.sort((a, b) => b.amount - a.amount).map((category) => (
              <div key={category.category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-full" style={{ backgroundColor: categoryColors[category.category] }}>
                      {categoryIcons[category.category]}
                    </span>
                    <span className="font-medium capitalize">{category.category}</span>
                  </div>
                  <div className="text-sm font-medium">
                    {formatCurrency(category.amount)} ({category.percentage.toFixed(0)}%)
                  </div>
                </div>
                <Progress value={category.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Transações recentes */}
      <Card>
        <CardHeader>
          <CardTitle>Transações Recentes</CardTitle>
          <CardDescription>Últimas 5 transações</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-full ${
                      transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                    }`}
                  >
                    {transaction.type === 'income' ? (
                      <ArrowUpRight className="h-4 w-4 text-income rotate-45" />
                    ) : (
                      <span className="p-1 rounded-full" style={{ backgroundColor: categoryColors[transaction.category] }}>
                        {categoryIcons[transaction.category]}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(transaction.date).toLocaleString('pt-BR', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                      {transaction.whatsappSource && (
                        <span className="ml-2 bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full text-[10px]">
                          WhatsApp
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <span
                  className={`font-medium ${
                    transaction.type === 'income' ? 'text-income' : 'text-expense'
                  }`}
                >
                  {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinanceDashboard;
