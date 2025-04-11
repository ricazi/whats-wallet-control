import { Transaction, WhatsAppMessage } from "@/types/finance";

// Mock de mensagens do WhatsApp
export const mockWhatsAppMessages: WhatsAppMessage[] = [
  {
    id: '1',
    content: 'Paguei R$50 no almoço hoje.',
    timestamp: new Date().toISOString(),
    fromUser: true,
  },
  {
    id: '2',
    content: 'Ok, anotado!',
    timestamp: new Date().toISOString(),
    fromUser: false,
  },
  {
    id: '3',
    content: 'Gastei R$30 no Uber.',
    timestamp: new Date().toISOString(),
    fromUser: true,
  },
  {
    id: '4',
    content: 'Entendi, mais alguma coisa?',
    timestamp: new Date().toISOString(),
    fromUser: false,
  },
  {
    id: '5',
    content: 'Sim, comprei um livro por R$45.',
    timestamp: new Date().toISOString(),
    fromUser: true,
  },
];

// Cores das categorias
const categoryColors = {
  food: '#FF9F1C',
  transport: '#2EC4B6',
  housing: '#E71D36',
  entertainment: '#7209B7',
  health: '#4CC9F0',
  education: '#4361EE',
  others: '#B5B5B5',
  gardening: '#78C850',
  maintenance: '#A0A0A0',
  fitness: '#FF5252',
  beauty: '#FF80AB',
  technology: '#00B0FF',
  clothing: '#8C9EFF',
  pets: '#FFD54F'
};

// Função para analisar a mensagem e extrair informações da transação
export const parseTransactionFromText = (text: string): Omit<Transaction, 'id' | 'type'> | null => {
  // Expressão regular para encontrar o valor e a descrição
  const regex = /paguei|gastei|comprei\s+r\$?\s*(\d+(?:,\d{3})*(?:\.\d{1,2})?)\s+em\s+(.*)|paguei|gastei|comprei\s+r\$?\s*(\d+(?:,\d{3})*(?:\.\d{1,2})?)\s+(.*)/i;
  const match = text.match(regex);

  if (match) {
    // Extrai o valor e a descrição da mensagem
    const amount = parseFloat(match[1]?.replace('.', '').replace(',', '.') || match[3]?.replace('.', '').replace(',', '.'));
    const description = match[2] || match[4] || 'Despesa';

    // Retorna um objeto com as informações da transação
    return {
      amount: amount,
      description: description.trim(),
      date: new Date().toISOString(),
      category: 'others', // Categoria padrão
      whatsappSource: true,
    };
  }

  return null;
};

// Função para gerar uma resposta automática do bot
export const generateBotResponse = (transaction: Omit<Transaction, 'id' | 'type'> | null, accountId: string): string => {
  if (transaction && transaction.amount) {
    return `Ok, despesa de R$ ${transaction.amount} em ${transaction.description} registrada na sua conta ${accountId}.`;
  } else {
    return 'Desculpe, não consegui entender a sua mensagem. Pode me dizer quanto você gastou e onde?';
  }
};
