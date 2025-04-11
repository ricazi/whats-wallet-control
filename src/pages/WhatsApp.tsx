
import React from 'react';
import MainLayout from '../components/Layout/MainLayout';
import WhatsAppInput from '../components/WhatsAppSimulator/WhatsAppInput';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const WhatsApp: React.FC = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">WhatsApp</h2>
        
        <Card className="bg-white border border-gray-200 mb-6">
          <CardHeader>
            <CardTitle>Como funciona</CardTitle>
            <CardDescription>Controle financeiro pelo WhatsApp</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-4 rounded-lg bg-green-50 border border-green-100">
                <div className="w-12 h-12 rounded-full bg-green-100 text-green-500 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl">1</span>
                </div>
                <h3 className="font-medium mb-2">Envie mensagem</h3>
                <p className="text-gray-600 text-sm">Informe suas despesas diárias por mensagem</p>
              </div>

              <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl">2</span>
                </div>
                <h3 className="font-medium mb-2">Processamento automático</h3>
                <p className="text-gray-600 text-sm">O sistema categoriza e registra suas despesas</p>
              </div>

              <div className="p-4 rounded-lg bg-purple-50 border border-purple-100">
                <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-500 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl">3</span>
                </div>
                <h3 className="font-medium mb-2">Visualize relatórios</h3>
                <p className="text-gray-600 text-sm">Acompanhe seus gastos e receba sugestões</p>
              </div>
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-100 mt-4">
              <h4 className="font-medium mb-1">Dica:</h4>
              <p className="text-sm">
                Para melhor experiência, inclua sempre o valor e uma descrição da sua despesa. 
                Exemplo: <span className="font-medium">"Gastei R$ 50 no restaurante"</span> ou 
                <span className="font-medium">"Uber para o trabalho, R$ 25"</span>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="max-w-md mx-auto">
          <WhatsAppInput />
        </div>
      </div>
    </MainLayout>
  );
};

export default WhatsApp;
