"use client"

import CategoryCard from '../components/CategoryCard';
import FeatureCard from '../components/FeatureCard';
import Carousel from '../components/imageCarousel';
import React from 'react';
import './globals.css';

export default function Home() {

  return (
    <div>
      this is user page...
      {/* <ProductCard/> */}
      {/* <CategoryCard/> */}
      {/* <CartItem product={{}} onRemove={() => {}} /> */}
      <FeatureCard/>
      <Carousel />
    </div>
  );
}


