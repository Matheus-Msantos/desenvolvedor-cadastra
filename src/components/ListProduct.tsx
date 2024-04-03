import React, { useEffect, useState } from "react";

import PropTypes from 'prop-types';
import axios from "axios";

interface RequestProduct {
  id: string;
  image: string;
  name: string;
  price: number;
  parcelamento: Array<number>;
  color: string;
  size: Array<string>;
  date: string;
}

const ListProduct = (props: any) => {

  const [products, setProducts] = useState<RequestProduct[]>([]);
  const [startIndex, setStartIndex] = useState<number>(0);
  const itemsPerPage: number = 9;
  const [filteredProductColor] = useState<string | null>(localStorage.getItem('filterColor'));
  const [filteredProductSize] = useState<string | null>(localStorage.getItem('filterSize'));
  const [filtredProductPriceRange] = useState<string | null>(localStorage.getItem('filterPriceRange'));
  const [filtredProductPrice] = useState<string | null>(localStorage.getItem('filterPrice'));

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:5000/products');
        const jsonData: RequestProduct[] = response.data;

        setProducts(jsonData);

      } catch (error) {
        console.error('Ocorreu um erro ao buscar os dados:', error);
      }

    }

    fetchData();
  }, []);

  const formatMoney = (value: number) => {
    var formatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    return value ? formatter.format(value) : "";
  };

  const handleShowMore = () => {
    setStartIndex(prevIndex => prevIndex + itemsPerPage);
    setProducts(prevProducts => {
      const newProducts = products.slice(9, startIndex + itemsPerPage);
      return [...prevProducts, ...newProducts];
    })
  }

  const handleAddItems = (item: RequestProduct) => {
    props.loadProduct(true)
    const productJson = localStorage.getItem('produtos');

    const products: RequestProduct[] = productJson ? JSON.parse(productJson) : [];

    const isProductAlredy = products.some(product => product.id === item.id);

    if (!isProductAlredy) {
      products.push(item);
      const updatedProductJson = JSON.stringify(products);
      localStorage.setItem('produtos', updatedProductJson);
    }

  }

  const productWithPriceRange = (price: number, priceRange: string) => {
    switch (priceRange) {
      case "0-50":
        return price >= 0 && price <= 50;
      case "51-150":
        return price >= 51 && price <= 151;
      case "151-300":
        return price >= 151 && price <= 300;
      case "301-500":
        return price >= 301 && price <= 500;
      case "500+":
        return price > 500;
      default:
        return true;

    }
  }

  const filterProduct = products?.filter(product => {
    const matchColor = !filteredProductColor || product.color === filteredProductColor;
    const matchSize = !filteredProductSize || product.size.includes(filteredProductSize);
    const matchPrice = !filtredProductPriceRange || productWithPriceRange(product.price, filtredProductPriceRange);

    return matchColor && matchSize && matchPrice;
  });

  const renderItems = () => {

    if (filterProduct.length > 0) {
      const visibleItems = filterProduct?.slice(0, startIndex + itemsPerPage);
      return visibleItems.map((product) => (
        <div className="cadastra-main_category-shelf-item" key={product.id}>
          <img className="cadastra-main_category-shelf-item--image" src={product.image} alt={product.name} />
          <p className="cadastra-main_category-shelf-item--name">{product.name}</p>
          <p className="cadastra-main_category-shelf-item--price">{formatMoney(product.price)}</p>
          <p className="cadastra-main_category-shelf-item--installment">até {product.parcelamento[0]}x de {formatMoney(product.parcelamento[1])}</p>

          <button className="cadastra-main_category-shelf-item--buy" onClick={() => { handleAddItems(product) }}>Comprar</button>
        </div>
      ))
    }

    if (filterProduct.length <= 0) {
      return (
        <div className="cadastra-main_category-empty">
          <p className="cadastra-main_category-empty-title">
            Sem produtos com esse(s) filtro(s): {filteredProductColor} {filteredProductSize} {filtredProductPrice}
          </p>
          <span className="cadastra-main_category-empty-subtitle">
            Limpe o filtro e tente novamente 😊
          </span>
        </div>
      )

    }

    const visibleItems = products?.slice(0, startIndex + itemsPerPage);
    return visibleItems.map((product) => (
      <div className="cadastra-main_category-shelf-item" key={product.id}>
        <img className="cadastra-main_category-shelf-item--image" src={product.image} alt={product.name} />
        <p className="cadastra-main_category-shelf-item--name">{product.name}</p>
        <p className="cadastra-main_category-shelf-item--price">{formatMoney(product.price)}</p>
        <p className="cadastra-main_category-shelf-item--installment">até {product.parcelamento[0]}x de {formatMoney(product.parcelamento[1])}</p>

        <button className="cadastra-main_category-shelf-item--buy" onClick={() => { handleAddItems(product) }}>Comprar</button>
      </div>
    ))

  }

  return (
    <div className="cadastra-main_category-shelf">
      <div className="cadastra-main_category-shelf--container">
        {renderItems()}
      </div>
      {startIndex + itemsPerPage < products.length && (
        <>
          {filterProduct.length >= 9 && (
            <button className="cadastra-main_category-shelf--showMore" onClick={handleShowMore}>Carregar mais</button>
          )}

        </>
      )}
    </div>
  );
}

ListProduct.propTypes = {
  loadProduct: PropTypes.func.isRequired
}

export { ListProduct }