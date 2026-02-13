import React from 'react';
import { MapPin, Shield, Clock, Home } from 'lucide-react';

const Features = () => {
  const features = [
    {
      id: 1,
      icon: MapPin,
      title: 'Gratis Ongkir',
      description: 'Untuk pembelian minimal Rp 500.000',
      gradient: 'from-secondary-light to-secondary'
    },
    {
      id: 2,
      icon: Shield,
      title: 'Batik Asli',
      description: '100% batik autentik Indonesia',
      gradient: 'from-bronze to-bronze-dark'
    },
    {
      id: 3,
      icon: Clock,
      title: 'Pengiriman Cepat',
      description: 'Estimasi 2-4 hari kerja',
      gradient: 'from-gold to-accent'
    },
    {
      id: 4,
      icon: Home,
      title: 'Easy Return',
      description: 'Pengembalian mudah dalam 7 hari',
      gradient: 'from-primary to-primary-light'
    },
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-batik-cream via-white to-batik-cream">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="text-center space-y-4 p-8 rounded-2xl bg-gradient-to-br from-white to-batik-cream/50 border border-batik-beige/50 shadow-md hover:shadow-xl hover:shadow-secondary/10 transition-all duration-300 group transform hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-20 h-20 mx-auto bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-secondary/20`}>
                  <Icon size={36} className="text-white drop-shadow-lg" />
                </div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-batik-dark to-primary bg-clip-text text-transparent">
                  {feature.title}
                </h3>
                <p className="text-batik-brown/80 font-medium">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
