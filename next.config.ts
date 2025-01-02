import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*', // Это путь, на который вы будете отправлять запросы на фронтенде
        destination: 'http://localhost:8080/api/:path*', // Прокси запросы на ваш бэкенд
      },
    ]
  },
};

export default nextConfig;
