
import React from 'react';
import MainLayout from '../components/Layout/MainLayout';
import FinanceDashboard from '../components/Dashboard/FinanceDashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import WhatsAppInput from '../components/WhatsAppSimulator/WhatsAppInput';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const isMobile = useIsMobile();
  
  return (
    <MainLayout>
      <div className="space-y-6">
        {!isMobile && (
          <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-none mb-6">
            <CardHeader className="pb-2">
              <CardTitle>Bem-vindo ao WalletControl</CardTitle>
              <CardDescription>
                Gerencie suas finanças de forma simples através do WhatsApp
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Use o simulador do WhatsApp para lançar despesas ou navegue pelo dashboard para uma visão geral das suas finanças.
              </p>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <FinanceDashboard />
          </div>
          <div className="md:col-span-1">
            <WhatsAppInput />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
