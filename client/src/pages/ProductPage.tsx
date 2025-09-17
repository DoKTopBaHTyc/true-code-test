import React from 'react';
import { useParams } from 'react-router-dom';
import { useProduct } from '../entities/product/hooks';

export default function ProductPage(){
  const { id } = useParams();
  const { data, isLoading } = useProduct(id);
  if (isLoading) return <div>Loading...</div>;
  return (
    <div style={{padding:20}}>
      <h1>{data.title}</h1>
      <img src={data.photoPath ? `http://localhost:3001${data.photoPath}` : ''} alt={data.title} width={300} />
      <p>{data.description}</p>
      <p>Price: {data.price}</p>
    </div>
  )
}
