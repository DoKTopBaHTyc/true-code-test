import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useProducts } from '../entities/product/hooks';

export default function ProductListPage(){
  const [searchParams, setSearchParams] = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());
  const { data, isLoading } = useProducts(params);

  if (isLoading) return <div>Loading...</div>;
  return (
    <div style={{padding:20}}>
      <h1>Catalog</h1>
      <ul>
        {data.items.map((p: any) => (
          <li key={p.id}><Link to={`/products/${p.id}`}>{p.title} — {p.price}</Link></li>
        ))}
      </ul>
      <div style={{marginTop:20}}>
        <button disabled={data.page <= 1} onClick={() => setSearchParams({ ...params, page: String(data.page - 1) })}>Prev</button>
        <span style={{margin:'0 10px'}}> {data.page} </span>
        <button disabled={data.page * data.limit >= data.total} onClick={() => setSearchParams({ ...params, page: String(data.page + 1) })}>Next</button>
      </div>
    </div>
  )
}
