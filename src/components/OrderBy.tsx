import React, { useState } from "react";
import CloseFilters from "../icons/closeFilters";

const OrderBy = () => {

  const [showOrder, setShowOrder] = useState<boolean>(false);

  const handleClickOrder = () => {
    if (showOrder)
      setShowOrder(false);
    else
      setShowOrder(true);

  }

  return (
    <div className="cadastra-main_top-orderBy--flex">



      <button className="cadastra-main_top-orderBy" onClick={handleClickOrder}>
        <span className="cadastra-main_top-orderBy-select">Ordena por:</span>
      </button>
      <div className={`cadastra-main_top-orderBy-container ${showOrder && 'cadastra-main_top-orderBy-container--active'}`}>

        <div className="cadastra-main_top-orderBy-container-header">
          <p className="cadastra-main_top-orderBy-container-header--text">Ordernar</p>

          <button className="cadastra-main_top-orderBy-container-header--button" onClick={handleClickOrder}><CloseFilters /></button>
        </div>

        <button className="cadastra-main_top-orderBy-container--item">Mas recentes</button>
        <button className="cadastra-main_top-orderBy-container--item">Menor preço</button>
        <button className="cadastra-main_top-orderBy-container--item">Maior preço</button>
      </div>
    </div>
  );
}

export { OrderBy }