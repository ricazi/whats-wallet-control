
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.whatswalletcontrol',
  appName: 'WalletControl',
  webDir: 'dist',
  server: {
    // Atualize esta URL com o endereço de publicação do seu site quando estiver pronto
    url: 'https://seu-app-publicado.lovable.app',
    cleartext: true
  },
  android: {
    buildOptions: {
      // Você precisará criar um keystore para assinar seu app
      keystorePath: 'keystore-walletcontrol.keystore',
      keystoreAlias: 'walletcontrol-key',
      keystorePassword: 'sua-senha-segura',
      keyPassword: 'sua-senha-segura'
    }
  }
};

export default config;
