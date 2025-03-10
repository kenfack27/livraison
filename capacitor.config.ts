import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'gaz-located-frontend',
  webDir: 'www',
  server: {
    url: 'https://kapexpert.cloud:30004/',
    cleartext: true
  }
};

export default config;
