"use client"

import ProductCard from '../components/Card';
import FeatureCard from '../components/FeatureCard';
import Carousel from '../components/imageCarousel';
import React from 'react';
import './globals.css';

export default function Home() {

  return (
    <div>
      <FeatureCard/>
      <ProductCard/>
      <Carousel />
    </div>
  );
}


