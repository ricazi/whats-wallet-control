
import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { WhatsAppMessage, Account } from '@/types/finance';
import { mockWhatsAppMessages, parseTransactionFromText, generateBotResponse } from '@/data/mockData';
import { useToast } from '@/components/ui/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Contas de exemplo para simulação
const defaultAccounts: Account[] = [
  {
    id: '1',
    name: 'Pessoal',
    description: 'Despesas pessoais do dia a dia',
    icon: 'wallet',
    color: '#9b87f5',
    isDefault: true
  },
  {
    id: '2',
    name: 'Família',
    description: 'Despesas compartilhadas com a família',
    icon: 'home',
    color: '#F97316'
  },
  {
    id: '3',
    name: 'Trabalho',
    description: 'Despesas relacionadas ao trabalho',
    icon: 'briefcase',
    color: '#0EA5E9'
  }
];

// Palavras-chave para categorização automática
const categoryKeywords = {
  food: ['comida', 'restaurante', 'lanche', 'almoço', 'jantar', 'café', 'mercado', 'supermercado', 'pizza', 'refeição'],
  transport: ['carro', 'uber', 'táxi', 'gasolina', 'combustível', 'transporte', 'ônibus', 'trem', 'metrô', 'passagem'],
  housing: ['aluguel', 'condomínio', 'luz', 'água', 'gás', 'internet', 'telefone', 'moradia', 'casa', 'apartamento'],
  entertainment: ['cinema', 'teatro', 'show', 'streaming', 'netflix', 'spotify', 'jogo', 'livro', 'passeio', 'viagem'],
  health: ['médico', 'hospital', 'remédio', 'farmácia', 'consulta', 'exame', 'saúde', 'plano de saúde', 'fisioterapia', 'dentista'],
  education: ['curso', 'faculdade', 'escola', 'livro', 'material', 'aula', 'educação', 'apostila', 'treinamento', 'certificação'],
  gardening: ['planta', 'jardim', 'flor', 'adubo', 'jardinagem', 'horta', 'vaso', 'terra', 'sementes', 'poda'],
  maintenance: ['conserto', 'reparo', 'manutenção', 'encanador', 'eletricista', 'pintura', 'reforma', 'ferramenta', 'peça', 'serviço'],
  fitness: ['academia', 'treino', 'exercício', 'personal', 'equipamento', 'suplemento', 'esporte', 'natação', 'pilates', 'yoga'],
  beauty: ['cabelo', 'salão', 'manicure', 'pedicure', 'spa', 'massagem', 'estética', 'cuidados', 'maquiagem', 'produtos'],
  technology: ['celular', 'computador', 'notebook', 'tablet', 'gadget', 'software', 'aplicativo', 'eletrônico', 'acessório', 'carregador'],
  clothing: ['roupa', 'calçado', 'tênis', 'sapato', 'camisa', 'calça', 'vestido', 'jaqueta', 'casaco', 'acessório'],
  pets: ['animal', 'cachorro', 'gato', 'pet', 'ração', 'veterinário', 'petshop', 'brinquedo', 'remédio', 'banho']
};

const WhatsAppInput: React.FC = () => {
  const [messages, setMessages] = useState<WhatsAppMessage[]>(mockWhatsAppMessages);
  const [newMessage, setNewMessage] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [selectedAccount, setSelectedAccount] = useState<string>('1'); // ID da conta padrão
  const [autoCreatedCategories, setAutoCreatedCategories] = useState<Set<string>>(new Set());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Função para determinar categoria automática baseada no texto da mensagem
  const detectCategory = (text: string): { category: string, subcategory: string | null } => {
    // Converte para minúsculas para facilitar a comparação
    const lowerText = text.toLowerCase();
    
    // Verifica palavras-chave em cada categoria
    for (const [category, keywords] of Object.entries(categoryKeywords)) {
      for (const keyword of keywords) {
        if (lowerText.includes(keyword)) {
          return { category, subcategory: null };
        }
      }
    }
    
    // Se nenhuma palavra-chave for encontrada, verifica se há uma nova subcategoria
    // Extrai possíveis subcategorias do texto (geralmente substantivos no início da frase)
    const words = lowerText.split(/\s+/);
    const potentialSubcategory = words.find(word => 
      word.length > 3 && 
      !['gastei', 'paguei', 'comprei', 'para', 'com', 'reais', 'valor'].includes(word)
    );
    
    if (potentialSubcategory) {
      // Se encontrou uma potencial subcategoria, verifica se ela já existe
      if (!autoCreatedCategories.has(potentialSubcategory)) {
        return { 
          category: 'others', // Categoria padrão
          subcategory: potentialSubcategory 
        };
      }
    }
    
    return { category: 'others', subcategory: null };
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    // Adiciona a mensagem do usuário
    const userMessage: WhatsAppMessage = {
      id: Math.random().toString(36).substring(2, 15),
      content: newMessage,
      timestamp: new Date().toISOString(),
      fromUser: true,
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Simula o processamento da mensagem
    setTimeout(() => {
      // Tenta extrair uma transação da mensagem
      const transaction = parseTransactionFromText(userMessage.content);
      
      if (transaction) {
        // Determina a categoria baseada no conteúdo da mensagem
        const { category, subcategory } = detectCategory(userMessage.content);
        transaction.accountId = selectedAccount;
        transaction.category = category as any;
        
        // Se identificou uma nova subcategoria, adiciona ao transaction e ao set de categorias criadas
        if (subcategory) {
          transaction.subcategory = subcategory;
          setAutoCreatedCategories(prev => new Set(prev).add(subcategory));
        }
      }
      
      // Gera uma resposta do bot
      const botResponse = generateBotResponse(transaction, selectedAccount);
      
      // Se criou uma nova subcategoria, adiciona uma mensagem específica
      let finalBotResponse = botResponse;
      if (transaction?.subcategory) {
        finalBotResponse = `${botResponse}\n\nCriei a subcategoria "${transaction.subcategory}" dentro da categoria ${transaction.category}.`;
      }
      
      // Adiciona a mensagem do bot
      const botMessage: WhatsAppMessage = {
        id: Math.random().toString(36).substring(2, 15),
        content: finalBotResponse,
        timestamp: new Date().toISOString(),
        fromUser: false,
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setIsTyping(false);

      // Notifica o usuário que a transação foi salva
      if (transaction && transaction.amount) {
        const accountName = defaultAccounts.find(a => a.id === selectedAccount)?.name || 'Pessoal';
        const categoryDisplay = transaction.subcategory 
          ? `${transaction.category} (${transaction.subcategory})`
          : transaction.category;
          
        toast({
          title: 'Despesa registrada',
          description: `${transaction.description} - R$ ${transaction.amount} na categoria ${categoryDisplay} (Conta: ${accountName})`,
        });
      }
    }, 1000); // Simula 1 segundo de processamento
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getAccountColor = (accountId: string) => {
    return defaultAccounts.find(acc => acc.id === accountId)?.color || '#9b87f5';
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="bg-green-500 text-white rounded-t-lg pb-3">
        <CardTitle className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
            <path d="M17.6 6.32A7.85 7.85 0 0 0 12 4a7.94 7.94 0 0 0-6.865 11.904l-1.108 3.274.025.05a1.17 1.17 0 0 0 1.108 1.562c.19 0 .385-.05.56-.16l3.274-1.108A7.92 7.92 0 0 0 12 20a7.9 7.9 0 0 0 5.6-2.32 7.91 7.91 0 0 0 0-11.36zm-1.06 10.308A6.33 6.33 0 0 1 12 18.4a6.3 6.3 0 0 1-2.56-.539l-.177-.086-1.962.664.664-1.962-.086-.177A6.3 6.3 0 0 1 7.34 13.6a6.27 6.27 0 0 1 1.849-4.477A6.33 6.33 0 0 1 12 7.4a6.33 6.33 0 0 1 4.477 1.85 6.27 6.27 0 0 1 0 8.96z" />
            <path d="M14.585 13.883l-1.827-.548a.694.694 0 0 0-.677.172l-.448.448a.68.68 0 0 1-.677.172 8.36 8.36 0 0 1-2.06-2.06.68.68 0 0 1 .172-.677l.448-.448a.694.694 0 0 0 .172-.677l-.548-1.827a.694.694 0 0 0-.625-.454 2.56 2.56 0 0 0-2.512 2.512.68.68 0 0 0 .024.16 10.68 10.68 0 0 0 4.04 5.971l.086.049c.32.184.658.355 1.01.513.16.024.32.024.48.024a2.56 2.56 0 0 0 2.512-2.512.694.694 0 0 0-.454-.625z" />
          </svg>
          WalletControl WhatsApp
        </CardTitle>
        <CardDescription className="text-white opacity-80">
          Envie suas despesas e receba atualizações aqui
        </CardDescription>
      </CardHeader>

      <div className="px-4 py-2 border-b flex items-center gap-2 bg-gray-50">
        <div className="text-sm font-medium">Conta:</div>
        <Select value={selectedAccount} onValueChange={setSelectedAccount}>
          <SelectTrigger className="w-[140px] h-8 text-sm">
            <SelectValue placeholder="Selecionar conta" />
          </SelectTrigger>
          <SelectContent>
            {defaultAccounts.map((account) => (
              <SelectItem key={account.id} value={account.id}>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: account.color }}></div>
                  <span>{account.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <CardContent className="flex-grow overflow-y-auto mb-0 pb-0 pt-6 h-[500px]">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.fromUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-[70%] break-words ${
                  message.fromUser
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                }`}
              >
                <p>{message.content}</p>
                <p className={`text-xs mt-1 ${message.fromUser ? 'text-blue-100' : 'text-gray-500'}`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="px-4 py-2 rounded-lg bg-gray-100 text-gray-800 rounded-bl-none">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>

      <div className="p-4 border-t mt-auto">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Digite aqui sua despesa..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button
            size="icon"
            variant="default"
            disabled={isTyping || newMessage.trim() === ''}
            onClick={handleSendMessage}
            style={{ backgroundColor: getAccountColor(selectedAccount) }}
            className="hover:opacity-90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default WhatsAppInput;
