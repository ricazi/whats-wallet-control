
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockTransactions, mockMonthlySummary } from '@/data/mockData';
import { Transaction, CategorySummary } from '@/types/finance';

// Cores para as categorias
const categoryColors = {
  food: '#FF9F1C',
  transport: '#2EC4B6',
  housing: '#E71D36',
  entertainment: '#7209B7',
  health: '#4CC9F0',
  education: '#4361EE',
  others: '#B5B5B5',
};

const categoryNames = {
  food: 'Alimentação',
  transport: 'Transporte',
  housing: 'Moradia',
  entertainment: 'Lazer',
  health: 'Saúde',
  education: 'Educação',
  others: 'Outros',
};

const ReportsView: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('month');
  const [activeReport, setActiveReport] = useState('category');

  // Formatar valores monetários
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  // Gerar dados para o gráfico de linha (despesas diárias)
  const generateDailyExpensesData = () => {
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);

    const dailyExpenses = mockTransactions
      .filter(t => t.type === 'expense' && new Date(t.date) >= thirtyDaysAgo)
      .reduce((acc: Record<string, number>, curr) => {
        const dateKey = new Date(curr.date).toISOString().split('T')[0];
        acc[dateKey] = (acc[dateKey] || 0) + curr.amount;
        return acc;
      }, {});

    return Object.entries(dailyExpenses)
      .map(([date, amount]) => ({
        date: new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
        valor: amount
      }))
      .sort((a, b) => {
        const [dayA, monthA] = a.date.split('/').map(Number);
        const [dayB, monthB] = b.date.split('/').map(Number);
        return (monthA * 100 + dayA) - (monthB * 100 + dayB);
      });
  };

  // Dados para o gráfico de categorias
  const categorySummary = mockMonthlySummary.categorySummary;
  
  // Dados para o gráfico de pizza
  const pieChartData = categorySummary.map((cat: CategorySummary) => ({
    name: categoryNames[cat.category],
    value: cat.amount
  }));

  // Dados para o gráfico de barras de categorias
  const barChartData = categorySummary.map((cat: CategorySummary) => ({
    name: categoryNames[cat.category],
    valor: cat.amount
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-3xl font-bold">Relatórios</h2>
        <Select value={selectedPeriod} onValueChange={(value: 'week' | 'month' | 'year') => setSelectedPeriod(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Últimos 7 dias</SelectItem>
            <SelectItem value="month">Último mês</SelectItem>
            <SelectItem value="year">Último ano</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs value={activeReport} onValueChange={setActiveReport} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="category">Por Categoria</TabsTrigger>
          <TabsTrigger value="time">Ao Longo do Tempo</TabsTrigger>
          <TabsTrigger value="comparison">Comparativo</TabsTrigger>
        </TabsList>

        <TabsContent value="category" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Despesas por Categoria</CardTitle>
                <CardDescription>Distribuição do gasto mensal</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={Object.values(categoryColors)[index % Object.values(categoryColors).length]} 
                        />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ranking de Categorias</CardTitle>
                <CardDescription>Da maior para a menor despesa</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={barChartData.sort((a, b) => b.valor - a.valor)}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis type="number" tickFormatter={(value) => `R$${value}`} />
                    <YAxis type="category" dataKey="name" width={80} />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Bar 
                      dataKey="valor" 
                      name="Valor" 
                      radius={[0, 4, 4, 0]}
                    >
                      {barChartData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={Object.values(categoryColors)[index % Object.values(categoryColors).length]} 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="time" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Evolução de Despesas</CardTitle>
              <CardDescription>Gastos diários no último mês</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={generateDailyExpensesData()}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    padding={{ left: 20, right: 20 }}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis tickFormatter={(value) => `R$${value}`} />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="valor"
                    name="Despesa"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Receitas x Despesas</CardTitle>
              <CardDescription>Comparação de entradas e saídas mensais</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: 'Abril 2025', receitas: mockMonthlySummary.income, despesas: mockMonthlySummary.expenses }
                  ]}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `R$${value}`} />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Legend />
                  <Bar dataKey="receitas" name="Receitas" fill="#4ade80" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="despesas" name="Despesas" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsView;
