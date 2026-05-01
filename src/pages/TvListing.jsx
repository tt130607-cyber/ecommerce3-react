import { useState, useEffect } from "react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";
import Sidebar from "../components/Sidebar";

export default function TvListing({ cart, setCart, pageType }) {

  // фильтры (input)
  const [brand, setBrand] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState(5000);

  // сортировка
  const [sortType, setSortType] = useState("low");

  // применённые фильтры
  const [appliedFilters, setAppliedFilters] = useState({
    brand: "",
    min: "",
    max: 5000
  });

  // правильный сброс при смене категории
  useEffect(() => {
    setBrand("");
    setMin("");
    setMax(5000);

    setAppliedFilters({
      brand: "",
      min: "",
      max: 5000
    });

    setSortType("low");
  }, [pageType]);

  // apply filters
  const applyFilters = () => {
    setAppliedFilters({ brand, min, max });
  };

  // фильтрация
  let result = products.filter(p => {
    return (
      p.category === pageType &&
      (!appliedFilters.brand || p.make === appliedFilters.brand) &&
      (!appliedFilters.min || p.price >= Number(appliedFilters.min)) &&
      (!appliedFilters.max || p.price <= Number(appliedFilters.max))
    );
  });

  // сортировка
  if (sortType === "low") {
    result.sort((a, b) => a.price - b.price);
  } else {
    result.sort((a, b) => b.price - a.price);
  }

  const filteredProducts = result;

  return (
    <div className="layout">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <Sidebar
          setBrand={setBrand}
          setMinPrice={setMin}
          setMaxPrice={setMax}
          applyFilters={applyFilters}
        />
      </aside>

      {/* MAIN */}
      <main>
        <h2>{filteredProducts.length} products</h2>

        <select
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>

        <div className="grid">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              cart={cart}
              setCart={setCart}
            />
          ))}
        </div>

      </main>
    </div>
  );
}