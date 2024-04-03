import React, { useState, useEffect } from 'react';
import { Filter } from './components/Filter';
import { Header } from './components/Header';
import { OrderBy } from './components/OrderBy';
import { ListProduct } from './components/ListProduct';
import { Footer } from './components/Footer';

function Category() {

  const [loadProduct, setLoadProduct] = useState(true);

  useEffect(() => {

    if (loadProduct) {
      setLoadProduct(false)
    }
  }, [loadProduct])


  return (
    <>
      <Header loadProduct={setLoadProduct} />

      <main className="cadastra-main">
        <div className="cadastra-main_top">
          <h1 className="cadastra-main_top-title">Blusas</h1>

          <div className="cadastra-main_top-buttons">
            <OrderBy />
          </div>
        </div>

        <div className="cadastra-main_category">
          <Filter />
          <ListProduct loadProduct={setLoadProduct} />

        </div>
      </main>

      <Footer />
    </>
  );
}

export default Category;
