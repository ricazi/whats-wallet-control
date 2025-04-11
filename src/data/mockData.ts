
import { Transaction, MonthlyBudget, MonthlySummary, SavingSuggestion, WhatsAppMessage, Category, CategorySummary } from '../types/finance';

// Função para gerar IDs únicos
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

// Dados de transações de exemplo
export const mockTransactions: Transaction[] = [
  {
    id: generateId(),
    amount: 1200,
    description: 'Salário',
    date: '2025-04-01T08:00:00',
    type: 'income',
    category: 'others',
  },
  {
    id: generateId(),
    amount: 500,
    description: 'Freelance',
    date: '2025-04-03T14:30:00',
    type: 'income',
    category: 'others',
  },
  {
    id: generateId(),
    amount: 150,
    description: 'Supermercado',
    date: '2025-04-05T18:20:00',
    type: 'expense',
    category: 'food',
    whatsappSource: true,
  },
  {
    id: generateId(),
    amount: 60,
    description: 'Uber',
    date: '2025-04-06T21:15:00',
    type: 'expense',
    category: 'transport',
    whatsappSource: true,
  },
  {
    id: generateId(),
    amount: 500,
    description: 'Aluguel',
    date: '2025-04-10T09:00:00',
    type: 'expense',
    category: 'housing',
  },
  {
    id: generateId(),
    amount: 80,
    description: 'Cinema com amigos',
    date: '2025-04-15T20:00:00',
    type: 'expense',
    category: 'entertainment',
    whatsappSource: true,
  },
  {
    id: generateId(),
    amount: 120,
    description: 'Consulta médica',
    date: '2025-04-18T10:30:00',
    type: 'expense',
    category: 'health',
  },
  {
    id: generateId(),
    amount: 200,
    description: 'Curso online',
    date: '2025-04-20T14:00:00',
    type: 'expense',
    category: 'education',
  },
  {
    id: generateId(),
    amount: 70,
    description: 'Restaurante',
    date: '2025-04-22T19:45:00',
    type: 'expense',
    category: 'food',
    whatsappSource: true,
  },
];

// Orçamento mensal de exemplo
export const mockMonthlyBudget: MonthlyBudget = {
  income: 1700,
  expenses: 1180,
  month: '2025-04',
};

// Função para calcular o resumo por categoria
export const calculateCategorySummary = (transactions: Transaction[]): CategorySummary[] => {
  const expenses = transactions.filter(t => t.type === 'expense');
  const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);
  
  const categories: Category[] = ['food', 'transport', 'housing', 'entertainment', 'health', 'education', 'others'];
  
  return categories.map(category => {
    const amount = expenses
      .filter(t => t.category === category)
      .reduce((sum, t) => sum + t.amount, 0);
    
    return {
      category,
      amount,
      percentage: totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0
    };
  }).filter(summary => summary.amount > 0);
};

// Resumo mensal de exemplo
export const mockMonthlySummary: MonthlySummary = {
  month: '2025-04',
  income: mockMonthlyBudget.income,
  expenses: mockMonthlyBudget.expenses,
  balance: mockMonthlyBudget.income - mockMonthlyBudget.expenses,
  categorySummary: calculateCategorySummary(mockTransactions)
};

// Sugestões de economia de exemplo
export const mockSavingSuggestions: SavingSuggestion[] = [
  {
    id: generateId(),
    category: 'food',
    title: 'Reduza gastos com delivery',
    description: 'Preparar refeições em casa pode economizar até R$ 200 por mês.',
    potentialSaving: 200,
  },
  {
    id: generateId(),
    category: 'transport',
    title: 'Use transporte público',
    description: 'Substituir Uber por transporte público em dias regulares.',
    potentialSaving: 150,
  },
  {
    id: generateId(),
    category: 'entertainment',
    title: 'Aproveite opções gratuitas',
    description: 'Busque eventos gratuitos e promoções para lazer.',
    potentialSaving: 100,
  },
];

// Mensagens do WhatsApp de exemplo
export const mockWhatsAppMessages: WhatsAppMessage[] = [
  {
    id: generateId(),
    content: 'Olá! Como posso te ajudar com suas finanças hoje?',
    timestamp: '2025-04-05T18:00:00',
    fromUser: false,
  },
  {
    id: generateId(),
    content: 'Gastei R$ 150 no supermercado hoje',
    timestamp: '2025-04-05T18:05:00',
    fromUser: true,
  },
  {
    id: generateId(),
    content: 'Registrado! R$ 150 no supermercado como despesa na categoria "alimentação".',
    timestamp: '2025-04-05T18:05:05',
    fromUser: false,
  },
  {
    id: generateId(),
    content: 'Uber para o trabalho R$ 60',
    timestamp: '2025-04-06T21:10:00',
    fromUser: true,
  },
  {
    id: generateId(),
    content: 'Anotado! R$ 60 para Uber como despesa na categoria "transporte".',
    timestamp: '2025-04-06T21:10:05',
    fromUser: false,
  },
  {
    id: generateId(),
    content: 'Fui ao cinema com amigos, gastei R$ 80',
    timestamp: '2025-04-15T19:55:00',
    fromUser: true,
  },
  {
    id: generateId(),
    content: 'Registrei! R$ 80 para cinema como despesa na categoria "lazer".',
    timestamp: '2025-04-15T19:55:05',
    fromUser: false,
  },
  {
    id: generateId(),
    content: 'Almocei em um restaurante, R$ 70',
    timestamp: '2025-04-22T19:40:00',
    fromUser: true,
  },
  {
    id: generateId(),
    content: 'Registrado! R$ 70 no restaurante como despesa na categoria "alimentação".',
    timestamp: '2025-04-22T19:40:05',
    fromUser: false,
  },
];

// Função para analisar texto e extrair informações de transação
export const parseTransactionFromText = (text: string): Partial<Transaction> | null => {
  // Expressão regular para encontrar valores monetários (ex: R$ 50, 50 reais, 50)
  const amountRegex = /R\$\s*(\d+(?:[.,]\d+)?)|(\d+(?:[.,]\d+)?)\s*reais|\b(\d+(?:[.,]\d+)?)\b/i;
  const amountMatch = text.match(amountRegex);
  
  if (!amountMatch) return null;
  
  // Captura o primeiro grupo que corresponde a um valor
  const amountValue = amountMatch[1] || amountMatch[2] || amountMatch[3];
  const amount = parseFloat(amountValue.replace(',', '.'));
  
  // Determina a categoria com base em palavras-chave
  let category: Category = 'others';
  
  if (/mercado|comida|restaurante|lanche|café|pizza|ifood/i.test(text)) {
    category = 'food';
  } else if (/uber|ônibus|táxi|transporte|gasolina|combustível|metrô/i.test(text)) {
    category = 'transport';
  } else if (/aluguel|casa|apartamento|condomínio|luz|água|gás|internet/i.test(text)) {
    category = 'housing';
  } else if (/cinema|festa|balada|show|teatro|shopping|parque|diversão/i.test(text)) {
    category = 'entertainment';
  } else if (/médico|hospital|remédio|farmácia|consulta|exame|academia/i.test(text)) {
    category = 'health';
  } else if (/curso|faculdade|escola|livro|estudo|educação/i.test(text)) {
    category = 'education';
  }
  
  // Extrai a descrição com base nas palavras ao redor do valor
  const wordsAroundAmount = text.split(/\s+/).slice(Math.max(0, amountMatch.index - 20), amountMatch.index + 20).join(' ');
  const description = wordsAroundAmount || text.substring(0, 30);
  
  return {
    amount,
    description,
    date: new Date().toISOString(),
    type: 'expense', // Assume que é uma despesa por padrão
    category,
    whatsappSource: true
  };
};

// Função para gerar resposta do bot
export const generateBotResponse = (transaction: Partial<Transaction>): string => {
  if (!transaction || !transaction.amount) {
    return "Desculpe, não consegui identificar um valor válido na sua mensagem. Pode tentar novamente?";
  }
  
  const categoryNames: Record<Category, string> = {
    food: "alimentação",
    transport: "transporte",
    housing: "moradia",
    entertainment: "lazer",
    health: "saúde",
    education: "educação",
    others: "outros"
  };
  
  const categoryName = categoryNames[transaction.category || 'others'];
  
  return `Registrado! R$ ${transaction.amount} ${transaction.description ? `para ${transaction.description}` : ''} como despesa na categoria "${categoryName}".`;
};
