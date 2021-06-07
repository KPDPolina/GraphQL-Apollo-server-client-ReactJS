import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import './App.css'; 
import { ADD_PRODUCT } from './mutation/product';
import { GET_ALL_PRODUCTS } from './query/product';

function App() {

  const {data, loading, error, refetch} = useQuery(GET_ALL_PRODUCTS)
  const [newProduct] = useMutation(ADD_PRODUCT)
  const [products, setProducts] = useState([])
  const [productname, setProductname] = useState('')
  const [productdesc, setProductdesc] = useState('')
  const [productprice, setProductprice] = useState(1)
  const [producttags, setProducttags] = useState('')

  useEffect(() => {
    if(!loading){ 
      setProducts(data.productEvery)
    }
  }, [data] )

  if(loading){
    return <h1>Loading...</h1>
  }

  const addProduct = (e) =>{
    e.preventDefault();
    newProduct({
        variables: {
            name: productname,
            desc: productdesc,
            price: productprice,
            tags: producttags.split(" "),

        }
    }).then(({data}) => {
      setProductname('');
      setProductdesc('');
      setProductprice(1);
      setProducttags('');
    })
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

  const getAll = (e) => {
    e.preventDefault();
    refetch();
  }

  return (
    <div id="returnPage">
      <div>
        <form>
          <span>Product Name:</span> <input value={productname} onChange={e => setProductname(e.target.value)} type="text" />
          <span>Description:</span> <input value={productdesc} onChange={e => setProductdesc(e.target.value)} type="text"/>
          <span>Price:</span> <input value={productprice} onChange={e => setProductprice(e.target.value)} type="number" min="1" />
          <span>Tags:</span> <input value={producttags} onChange={e => setProducttags(e.target.value)} type="text" />
          <div className="btns">
            <button onClick={(e) => addProduct(e)}>Создать продукт</button>
            <button onClick={(e) => getAll(e)}>Получить все продукты</button>
          </div>
        </form>        
      </div>
      <div className="productList">
        {products.map(product =>
            <div className="product">
              <div className="productName">{capitalizeFirstLetter(product.name)}</div>
              <div className="productTags">{product.tags.join(" ")}</div>
              <div className="productPrice">{product.price}$</div>
              <div className="productDesc">{capitalizeFirstLetter(product.desc).slice(0, 40)}...</div>
              </div>
          )}
      </div>

    </div>
  );
}

export default App;
