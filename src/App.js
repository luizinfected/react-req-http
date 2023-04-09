import { useEffect, useState } from 'react';
import './App.css';


import {useFetch} from './hooks/useFetch';

function App() {

  const url = 'http://localhost:3000/products'

  // const [products, setProducts] = useState([])

  // 4.1 - custom hook
  const {data: items, httpConfig, loading, error} = useFetch(url)

  const [name, setName] = useState('')
  const [price, setPrice] = useState('')


  // 1 - resgatando os dados sem o custom hook useFetch
  // const myFunction = async () => {
  //   const res = await fetch(url)
  //   const data = await res.json()
  //   setProducts(data)
  //   console.log(products)
  // };
  // useEffect(() => { myFunction(); }, []);

  //2 - add de produtos
  const handleSubmit = async (e) => {

    e.preventDefault()

    const product = {
      name,
      price,
    }

    // const res = await fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(product)
    // })

    // const addedProduct = await res.json()

    // //3 - carregamento dinamico
    // setProducts((prevProducts) => [...prevProducts, addedProduct])

    // 5 - refatorando post

    httpConfig(product, 'POST')
    setName('')
    setPrice('')
  }


  return (
    <div className="App">
      <h2>Lista de produtos</h2>
      {/* 6- loading */}
      { loading && <p>Carregando items...</p>}
      { error && {error}}
      <ul>
        {items && items.map((product) => (
          <li key={product.id}>{product.name} - R$ {product.price}</li>
        ))}
      </ul>

      <div className="add-product">
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input type="text" name='name' onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            Preço:
            <input type="text" name='price' onChange={(e) => setPrice(e.target.value)} />
          </label>
          
          {/* 7 - state de loading no post */}
          {!loading && <input type="submit" value="Criar" />}
        </form>
      </div>
    </div>
  );
}

export default App;
