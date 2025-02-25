"use client"

import ProductCard from '../components/Card';
import CategoryCard from '../components/CategoryCard';
import CartItem from '../components/CartItem';
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
      <ProductCard/>
      <Carousel />
    </div>
  );
}


