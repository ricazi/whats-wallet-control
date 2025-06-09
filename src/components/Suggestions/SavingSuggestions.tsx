
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockSavingSuggestions, mockMonthlySummary } from '@/data/mockData';
import { TrendingDown, Lightbulb, CreditCard, Activity, PiggyBank } from 'lucide-react';

const SavingSuggestions: React.FC = () => {
  // Formatar valores monetários
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const potentialSavings = mockSavingSuggestions.reduce(
    (sum, suggestion) => sum + suggestion.potentialSaving,
    0
  );

  const categoryIcons = {
    food: <TrendingDown className="h-5 w-5" />,
    transport: <TrendingDown className="h-5 w-5" />,
    housing: <TrendingDown className="h-5 w-5" />,
    entertainment: <TrendingDown className="h-5 w-5" />,
    health: <TrendingDown className="h-5 w-5" />,
    education: <TrendingDown className="h-5 w-5" />,
    others: <TrendingDown className="h-5 w-5" />,
  };

  const categoryColors = {
    food: 'bg-orange-100 text-orange-600',
    transport: 'bg-teal-100 text-teal-600',
    housing: 'bg-red-100 text-red-600',
    entertainment: 'bg-purple-100 text-purple-600',
    health: 'bg-blue-100 text-blue-600',
    education: 'bg-indigo-100 text-indigo-600',
    others: 'bg-gray-100 text-gray-600',
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-none">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-amber-500" />
            Economize Inteligentemente
          </CardTitle>
          <CardDescription>
            Seguindo todas as sugestões, você poderia economizar até{' '}
            <span className="font-semibold text-accent">{formatCurrency(potentialSavings)}</span> por mês!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-6 pt-2">
            <div className="bg-white shadow-sm rounded-lg p-4 flex items-center gap-4 flex-1">
              <div className="p-3 rounded-full bg-green-100">
                <PiggyBank className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Economia Potencial</p>
                <p className="text-2xl font-bold text-accent">{formatCurrency(potentialSavings)}</p>
              </div>
            </div>

            <div className="bg-white shadow-sm rounded-lg p-4 flex items-center gap-4 flex-1">
              <div className="p-3 rounded-full bg-blue-100">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Saldo Atual</p>
                <p className="text-2xl font-bold text-primary">{formatCurrency(mockMonthlySummary.balance)}</p>
              </div>
            </div>

            <div className="bg-white shadow-sm rounded-lg p-4 flex items-center gap-4 flex-1">
              <div className="p-3 rounded-full bg-purple-100">
                <Activity className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Novo Saldo Projetado</p>
                <p className="text-2xl font-bold text-purple-600">
                  {formatCurrency(mockMonthlySummary.balance + potentialSavings)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-xl font-bold">Sugestões personalizadas para economizar</h3>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockSavingSuggestions.map((suggestion) => (
            <Card key={suggestion.id} className="overflow-hidden border-l-4" style={{ borderLeftColor: categoryColors[suggestion.category].split(' ')[0].replace('bg', 'border') }}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className={`p-2 rounded-lg ${categoryColors[suggestion.category]}`}>
                    {categoryIcons[suggestion.category]}
                  </div>
                  <div className="bg-gray-100 px-3 py-1 rounded-full text-gray-700 text-sm font-medium">
                    {formatCurrency(suggestion.potentialSaving)}/mês
                  </div>
                </div>
                <CardTitle className="mt-3 text-lg">{suggestion.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{suggestion.description}</p>
              </CardContent>
            </Card>
          ))}

          {/* Sugestão genérica para investimento */}
          <Card className="overflow-hidden border-l-4 border-l-blue-500">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                  <PiggyBank className="h-5 w-5" />
                </div>
                <div className="bg-gray-100 px-3 py-1 rounded-full text-gray-700 text-sm font-medium">
                  Investimento
                </div>
              </div>
              <CardTitle className="mt-3 text-lg">Invista suas economias</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Com uma economia de {formatCurrency(potentialSavings)} por mês, você poderia iniciar um 
                investimento de baixo risco e construir uma reserva de emergência importante!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SavingSuggestions;
