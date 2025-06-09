
import React from 'react';
import MainLayout from '../components/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import SavingSuggestions from '../components/Suggestions/SavingSuggestions';

const Settings: React.FC = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">Configurações</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Perfil</CardTitle>
                <CardDescription>Gerencie as informações da sua conta</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input id="name" defaultValue="Usuário Exemplo" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="usuario@exemplo.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone (WhatsApp)</Label>
                  <Input id="phone" defaultValue="+55 11 99999-9999" />
                </div>
                <Button className="w-full">Salvar alterações</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notificações</CardTitle>
                <CardDescription>Configurar alertas e lembretes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Relatório semanal</p>
                    <p className="text-sm text-gray-500">Receber resumo de gastos</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Alerta de orçamento</p>
                    <p className="text-sm text-gray-500">Quando ultrapassar 80% do limite</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Sugestões de economia</p>
                    <p className="text-sm text-gray-500">Dicas para economizar</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <SavingSuggestions />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;
