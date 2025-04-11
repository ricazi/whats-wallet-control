
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ShoppingCart, Car, Home, Film, Heart, BookOpen, MoreHorizontal, Search } from 'lucide-react';
import { Category, Transaction } from '@/types/finance';
import { mockTransactions } from '@/data/mockData';

const categoryIcons: Record<Category, React.ReactNode> = {
  food: <ShoppingCart className="h-4 w-4" />,
  transport: <Car className="h-4 w-4" />,
  housing: <Home className="h-4 w-4" />,
  entertainment: <Film className="h-4 w-4" />,
  health: <Heart className="h-4 w-4" />,
  education: <BookOpen className="h-4 w-4" />,
  others: <MoreHorizontal className="h-4 w-4" />,
};

const categoryColors: Record<Category, string> = {
  food: '#FF9F1C',
  transport: '#2EC4B6',
  housing: '#E71D36',
  entertainment: '#7209B7',
  health: '#4CC9F0',
  education: '#4361EE',
  others: '#B5B5B5',
};

const categoryNames: Record<Category, string> = {
  food: 'Alimentação',
  transport: 'Transporte',
  housing: 'Moradia',
  entertainment: 'Lazer',
  health: 'Saúde',
  education: 'Educação',
  others: 'Outros',
};

const ExpensesList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('date');
  
  // Filtrar e ordenar transações
  const filteredTransactions = mockTransactions
    .filter((transaction) => {
      const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || transaction.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortBy === 'amount') {
        return b.amount - a.amount;
      }
      return 0;
    });

  // Formatar valores monetários
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Histórico de Transações</CardTitle>
        <CardDescription>Visualize e filtre suas transações</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar transações..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-4">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Categorias" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas categorias</SelectItem>
                <SelectItem value="food">Alimentação</SelectItem>
                <SelectItem value="transport">Transporte</SelectItem>
                <SelectItem value="housing">Moradia</SelectItem>
                <SelectItem value="entertainment">Lazer</SelectItem>
                <SelectItem value="health">Saúde</SelectItem>
                <SelectItem value="education">Educação</SelectItem>
                <SelectItem value="others">Outros</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Data (recente)</SelectItem>
                <SelectItem value="amount">Valor (maior)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {filteredTransactions.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-gray-500">Nenhuma transação encontrada.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Descrição</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium flex items-center gap-2">
                      {transaction.description}
                      {transaction.whatsappSource && (
                        <span className="bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full text-[10px]">
                          WhatsApp
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span 
                          className="p-1 rounded-full text-white" 
                          style={{ backgroundColor: categoryColors[transaction.category] }}
                        >
                          {categoryIcons[transaction.category]}
                        </span>
                        <span>{categoryNames[transaction.category]}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(transaction.date).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </TableCell>
                    <TableCell className={`text-right font-medium ${
                      transaction.type === 'income' ? 'text-income' : 'text-expense'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExpensesList;
