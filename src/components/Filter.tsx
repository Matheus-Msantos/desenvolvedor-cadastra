import React, { useState } from "react";
import CloseFilters from "../icons/closeFilters";

interface FilterItem {
  text: string;
}
interface FilterPrice {
  text: string;
  range: string
}

const Filter = () => {

  const [activeColors, setActiveColors] = useState<number | null>(null);
  const [activeColorsRemaining, setActiveColorsRemaining] = useState<number | null>(null);
  const [activeSizes, setActiveSizes] = useState<number | null>(null);
  const [activePriceRanges, setActivePriceRanges] = useState<number | null>(null);
  const [showFilterColor, setShowFilterColor] = useState<boolean>(false);
  const [closeFilter, setCloseFilter] = useState<boolean>(false);
  const [openFilterColor, setOpenFilterColor] = useState<boolean>();
  const [openFilterSize, setOpenFilterSize] = useState<boolean>();
  const [openFilterPrice, setOpenFilterPrice] = useState<boolean>();

  const colors: FilterItem[] = [
    { text: "Amarelo" },
    { text: "Azul" },
    { text: "Branco" },
    { text: "Cinza" },
    { text: "Laranja" },
  ];

  const colorsRemaining: FilterItem[] = [
    { text: "Verde" },
    { text: "Vermelho" },
    { text: "Preto" },
    { text: "Rosa" },
    { text: "Vinho" },
  ];

  const sizes: FilterItem[] = [
    { text: "P" },
    { text: "M" },
    { text: "G" },
    { text: "GG" },
    { text: "U" },
    { text: "36" },
    { text: "38" },
    { text: "40" },
    { text: "44" },
    { text: "46" },
  ];

  const priceRanges: FilterPrice[] = [
    { text: "de R$0 até R$50", range: '0-50' },
    { text: "de R$51 até R$150", range: '51-150' },
    { text: "de R$151 até R$300", range: '151-300' },
    { text: "de R$301 até R$500", range: '301-500' },
    { text: "a partir de R$ 500", range: '500+' },
  ];

  const filterAlredyColor = localStorage.getItem('filterColor');
  const filterAlredySize = localStorage.getItem('filterSize');
  const filterAlredyPrice = localStorage.getItem('filterPrice');

  const handleFilterColors = (index: number, text: string) => {
    setActiveColorsRemaining(null)
    setActiveColors(activeColors === index ? null : index);

    localStorage.setItem('filterColor', filterAlredyColor === text ? '' : text);
    window.location.reload();
  };

  const handleFilterColorsRemaining = (index: number, text: string) => {
    setActiveColors(null);
    setActiveColorsRemaining(activeColorsRemaining === index ? null : index);

    localStorage.setItem('filterColor', filterAlredyColor === text ? '' : text);
    window.location.reload();
  };

  const handleFilterSize = (index: number, text: string) => {
    setActiveSizes(activeSizes === index ? null : index);
    localStorage.setItem('filterSize', filterAlredySize === text ? '' : text);
    window.location.reload();
  };

  const handleFilterPriceRanges = (index: number, text: string, range: string) => {
    setActivePriceRanges(activePriceRanges === index ? null : index);
    localStorage.setItem('filterPrice', filterAlredyPrice === text ? '' : text);
    localStorage.setItem('filterPriceRange', filterAlredyPrice === text ? '' : range);
    window.location.reload();
  };

  const handleShowMoreColor = () => {
    setShowFilterColor(true)
  }

  const handleCloseFilter = () => {
    if (closeFilter)
      setCloseFilter(false);
    else
      setCloseFilter(true);
  }

  const handleOpenFilterColor = () => {
    if (openFilterColor)
      setOpenFilterColor(false)
    else
      setOpenFilterColor(true)
  }

  const handleOpenFilterSize = () => {
    if (openFilterSize)
      setOpenFilterSize(false)
    else
      setOpenFilterSize(true)
  }

  const handleOpenFilterPrice = () => {
    if (openFilterPrice)
      setOpenFilterPrice(false)
    else
      setOpenFilterPrice(true)
  }

  const handleEmptyFilter = () => {
    localStorage.removeItem('filterColor');
    localStorage.removeItem('filterSize');
    localStorage.removeItem('filterPrice');
    localStorage.removeItem('filterPriceRange');
    setCloseFilter(false);
    window.location.reload();
  }

  return (
    <>


      <button className="cadastra-main_top-filter--button cadastra-main_top-filter--button-filter" onClick={handleCloseFilter}>Filtrar</button>

      <div className={`cadastra-main_category-filter ${closeFilter && 'cadastra-main_category-filter--active'}`}>

        <div className="cadastra-main_category-filter-header">
          <p className="cadastra-main_category-filter-header--text">FILTRAR</p>

          <button className="cadastra-main_category-filter-header--button" onClick={handleCloseFilter}><CloseFilters /></button>
        </div>

        <div className="cadastra-main_category-filter-color">

          <p className="cadastra-main_category-filter-color--title" onClick={handleOpenFilterColor}>Cores</p>

          <ul className={`cadastra-main_category-filter-color--list ${openFilterColor && 'cadastra-main_category-filter-color--list-active'}`}>

            {colors.map((item, index) => (
              <li key={index} className={`cadastra-main_category-filter-color--item ${activeColors === index || filterAlredyColor === item.text ? 'cadastra-main_category-filter-color--item-active' : ''}`} onClick={() => handleFilterColors(index, item.text)}>
                <div className="cadastra-main_category-filter-color--item-container">
                  <div className="cadastra-main_category-filter-color--item-checkbox"></div>
                  <span className="cadastra-main_category-filter-color--item-text">{item.text}</span>
                </div>
              </li>
            ))}

          </ul>

          <p className={`cadastra-main_category-filter-color--show-more ${showFilterColor && 'cadastra-main_category-filter-color--show-more-hiden'}`} onClick={handleShowMoreColor}>Ver todas as cores</p>

          <ul className={`cadastra-main_category-filter-color--list cadastra-main_category-filter-color--list-secondary ${openFilterColor || showFilterColor ? 'cadastra-main_category-filter-color--list-active cadastra-main_category-filter-color--list-secondary-active' : ''} `}>

            {colorsRemaining.map((item, index) => (
              <li key={index} className={`cadastra-main_category-filter-color--item ${activeColorsRemaining === index || filterAlredyColor === item.text ? 'cadastra-main_category-filter-color--item-active' : ''}`} onClick={() => handleFilterColorsRemaining(index, item.text)}>
                <div className="cadastra-main_category-filter-color--item-container">
                  <div className="cadastra-main_category-filter-color--item-checkbox"></div>
                  <span className="cadastra-main_category-filter-color--item-text">{item.text}</span>
                </div>
              </li>
            ))}

          </ul>


        </div>

        <div className="cadastra-main_category-filter-size">

          <p className="cadastra-main_category-filter-size--title" onClick={handleOpenFilterSize}>Tamanhos</p>

          <ul className={`cadastra-main_category-filter-size--list ${openFilterSize && 'cadastra-main_category-filter-size--list-active'}`}>

            {sizes.map((item, index) => (
              <li className={`cadastra-main_category-filter-size--item ${activeSizes === index || filterAlredySize === item.text ? 'cadastra-main_category-filter-size--item-active' : ''}`} key={index} onClick={() => { handleFilterSize(index, item.text) }}>
                <span className="cadastra-main_category-filter-size--item-text">{item.text}</span>
              </li>
            ))}

          </ul>
        </div>

        <div className="cadastra-main_category-filter-price">

          <p className="cadastra-main_category-filter-price--title" onClick={handleOpenFilterPrice}>Faixa de Preço</p>

          <ul className={`cadastra-main_category-filter-price--list ${openFilterPrice && 'cadastra-main_category-filter-price--list-active'}`}>

            {priceRanges.map((item, index) => (
              <li key={index} className={`cadastra-main_category-filter-price--item ${activePriceRanges === index || filterAlredyPrice === item.text ? 'cadastra-main_category-filter-price--item-active' : ''}`} onClick={() => handleFilterPriceRanges(index, item.text, item.range)}>
                <div className="cadastra-main_category-filter-price--item-container">
                  <div className="cadastra-main_category-filter-price--item-checkbox"></div>
                  <span className="cadastra-main_category-filter-price--item-text">{item.text}</span>
                </div>
              </li>
            ))}

          </ul>
        </div>

        <div className="cadastra-main_category-filter-footer">
          <button className="cadastra-main_category-filter-footer--aply" onClick={handleCloseFilter}>FILTRAR</button>
          <button className="cadastra-main_category-filter-footer--trash" onClick={handleEmptyFilter}>LImpar</button>
        </div>

      </div>
    </>
  );
}

export { Filter }