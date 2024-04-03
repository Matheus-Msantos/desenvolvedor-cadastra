import React, { useState } from "react";
import Minicart from "../icons/minicart";
import PropTypes from 'prop-types';
import { PopupMiniCart } from "./PopupMiniCart";


const Header = (props: any) => {

  const [openMinicart, setOpenMinicart] = useState<boolean>(false);
  const products: string | null = localStorage.getItem('produtos');

  let convert = products ? JSON.parse(products) : []

  const handleOpenMinicart = () => {
    if (openMinicart)
      setOpenMinicart(false)
    else
      setOpenMinicart(true)

  }

  return (
    <header className="cadastra-header">
      <div className="cadastra-header_container">
        <img className="cadastra-header_container-img" src="/img/header/images/logo-header.png" alt="Logo cadastra" />
        <button id="minicart" className="cadastra-header_container-minicart" onClick={handleOpenMinicart}>
          <Minicart />

          {convert.length <= 0 ?
            ''
            : <span className="cadastra-header_container-minicart-number">{convert.length}</span>}
        </button>
      </div>
      <PopupMiniCart products={convert} openMinicart={openMinicart} loadProduct={props.loadProduct} />
    </header>
  );
}

Header.propTypes = {
  loadProduct: PropTypes.func.isRequired
}

export { Header }