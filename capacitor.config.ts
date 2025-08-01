import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.663139c5aa8e4a7d8834097626059e24',
  appName: 'whats-wallet-control',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: "https://663139c5-aa8e-4a7d-8834-097626059e24.lovableproject.com?forceHideBadge=true",
    cleartext: true
  }
};

export default config;