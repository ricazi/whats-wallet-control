
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.whatswalletcontrol',
  appName: 'WalletControl',
  webDir: 'dist',
  server: {
    url: 'https://seu-site-publicado.lovable.app',
    cleartext: true
  },
  android: {
    buildOptions: {
      keystorePath: 'your-keystore.keystore',
      keystoreAlias: 'key-alias',
      keystorePassword: 'keystore-password',
      keyPassword: 'key-password'
    }
  }
};

export default config;
