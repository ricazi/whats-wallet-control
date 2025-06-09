
import React, { useState } from 'react';
import MainLayout from '../components/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Wallet, Edit, Trash2 } from 'lucide-react';
import { Account } from '@/types/finance';
import { useToast } from '@/components/ui/use-toast';

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

const Accounts: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>(defaultAccounts);
  const [newAccount, setNewAccount] = useState<Partial<Account>>({
    name: '',
    description: '',
    color: '#9b87f5'
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleAddAccount = () => {
    if (!newAccount.name) {
      toast({
        title: 'Erro',
        description: 'O nome da conta é obrigatório',
        variant: 'destructive'
      });
      return;
    }

    if (isEditing && editingId) {
      // Atualizar conta existente
      setAccounts(accounts.map(account => 
        account.id === editingId 
          ? { ...account, ...newAccount, id: editingId } 
          : account
      ));
      toast({
        title: 'Conta atualizada',
        description: `A conta ${newAccount.name} foi atualizada com sucesso!`
      });
    } else {
      // Adicionar nova conta
      const newId = Math.random().toString(36).substring(2, 15);
      setAccounts([...accounts, { ...newAccount, id: newId } as Account]);
      toast({
        title: 'Conta criada',
        description: `A conta ${newAccount.name} foi criada com sucesso!`
      });
    }
    
    // Resetar formulário
    setNewAccount({ name: '', description: '', color: '#9b87f5' });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEditAccount = (account: Account) => {
    setNewAccount({
      name: account.name,
      description: account.description,
      color: account.color
    });
    setIsEditing(true);
    setEditingId(account.id);
  };

  const handleDeleteAccount = (id: string) => {
    const accountToDelete = accounts.find(account => account.id === id);
    if (accountToDelete?.isDefault) {
      toast({
        title: 'Operação não permitida',
        description: 'Não é possível excluir a conta padrão',
        variant: 'destructive'
      });
      return;
    }
    
    setAccounts(accounts.filter(account => account.id !== id));
    toast({
      title: 'Conta removida',
      description: 'A conta foi removida com sucesso!'
    });
  };
  
  const handleCancelEdit = () => {
    setNewAccount({ name: '', description: '', color: '#9b87f5' });
    setIsEditing(false);
    setEditingId(null);
  };

  return (
    <MainLayout>
      <h2 className="text-3xl font-bold mb-6">Minhas Contas</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Contas Disponíveis</CardTitle>
              <CardDescription>Gerencie suas contas para organizar melhor suas finanças</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {accounts.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p>Nenhuma conta cadastrada</p>
                  </div>
                ) : (
                  accounts.map((account) => (
                    <div 
                      key={account.id} 
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        <div 
                          className="p-2 rounded-full" 
                          style={{ backgroundColor: account.color }}
                        >
                          <Wallet className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="font-medium flex items-center gap-2">
                            {account.name}
                            {account.isDefault && (
                              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                                Padrão
                              </span>
                            )}
                          </div>
                          {account.description && (
                            <div className="text-sm text-gray-500">{account.description}</div>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => handleEditAccount(account)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          disabled={account.isDefault}
                          onClick={() => handleDeleteAccount(account.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>{isEditing ? 'Editar Conta' : 'Nova Conta'}</CardTitle>
              <CardDescription>
                {isEditing 
                  ? 'Atualize as informações da conta' 
                  : 'Crie uma nova conta para organizar suas finanças'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Nome da Conta *
                  </label>
                  <Input
                    id="name"
                    value={newAccount.name}
                    onChange={(e) => setNewAccount({ ...newAccount, name: e.target.value })}
                    placeholder="Ex: Pessoal, Família, Trabalho"
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-1">
                    Descrição
                  </label>
                  <Textarea
                    id="description"
                    value={newAccount.description || ''}
                    onChange={(e) => setNewAccount({ ...newAccount, description: e.target.value })}
                    placeholder="Descreva o propósito desta conta"
                    rows={3}
                  />
                </div>
                
                <div>
                  <label htmlFor="color" className="block text-sm font-medium mb-1">
                    Cor
                  </label>
                  <div className="flex gap-2">
                    <Input
                      id="color"
                      type="color"
                      value={newAccount.color || '#9b87f5'}
                      onChange={(e) => setNewAccount({ ...newAccount, color: e.target.value })}
                      className="w-12 h-10 p-1"
                    />
                    <div 
                      className="flex-1 rounded-md border border-gray-200" 
                      style={{ backgroundColor: newAccount.color || '#9b87f5' }}
                    ></div>
                  </div>
                </div>
                
                <div className="pt-2 flex gap-2">
                  {isEditing && (
                    <Button variant="outline" className="flex-1" onClick={handleCancelEdit}>
                      Cancelar
                    </Button>
                  )}
                  <Button className="flex-1 gap-1" onClick={handleAddAccount}>
                    {isEditing ? (
                      <>Atualizar</>
                    ) : (
                      <>
                        <PlusCircle className="h-4 w-4" />
                        <span>Adicionar</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Accounts;
