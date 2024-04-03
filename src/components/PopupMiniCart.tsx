import React from "react";
import PropTypes from 'prop-types';

interface Product {
  id: string;
  name: string;
  price: number;
}


const PopupMiniCart = (
  {
    products,
    openMinicart,
    loadProduct }: { products: Product[]; openMinicart: boolean; loadProduct: any }
) => {

  const formatMoney = (value: number) => {
    var formatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    return value ? formatter.format(value) : "";
  };

  const handleRemoveProduct = (item: string) => {
    loadProduct(true)
    const productDB = localStorage['produtos'];
    let product = productDB ? JSON.parse(productDB) : [];
    product = product.filter((product: any) => product.id !== item)
    localStorage['produtos'] = JSON.stringify(product);
  }

  return (
    <div className={`cadastra-header_container-minicart-product ${openMinicart && 'cadastra-header_container-minicart-product-active'}`}>
      <p className="cadastra-header_container-minicart-product-title">Meu Carrinho</p>
      {products.length <= 0 ?
        <p className="cadastra-header_container-minicart-product-empty">Seu carrinho está vazio :(</p>
        :
        <>
          {products.map((product: any) => (
            <div className="cadastra-header_container-minicart-product-item" key={product.id}>
              <img className="cadastra-header_container-minicart-product-item-image" src={product.image} alt={product.name} />
              <div className="cadastra-header_container-minicart-product-item-flex">
                <p className="cadastra-header_container-minicart-product-item-text">{product.name}</p>
                <p className="cadastra-header_container-minicart-product-item-price">{formatMoney(product.price)}</p>
                <p className="cadastra-header_container-minicart-product-item-color">cor: {product.color}</p>
                <button className="cadastra-header_container-minicart-product-item-remove" onClick={() => { handleRemoveProduct(product.id) }}>X</button>
              </div>
            </div>
          ))
          }</>
      }
    </div>
  );
}

PopupMiniCart.propTypes = {
  products: PropTypes.array.isRequired,
  openMinicart: PropTypes.func.isRequired,
  loadProduct: PropTypes.func.isRequired
}

export { PopupMiniCart }