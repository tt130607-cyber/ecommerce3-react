import { useState, useEffect } from "react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";
import Sidebar from "../components/Sidebar";

export default function LaptopListing({ cart, setCart, pageType }) {
  const [brand, setBrand] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState(5000);
  const [sortType, setSortType] = useState("low");

  const [appliedFilters, setAppliedFilters] = useState({
    brand: "",
    min: "",
    max: 5000
  });

  useEffect(() => {
    setBrand("");
    setMin("");
    setMax(5000);
    setSortType("low");

    setAppliedFilters({
      brand: "",
      min: "",
      max: 5000
    });
  }, [pageType]);

  const applyFilters = () => {
    setAppliedFilters({ brand, min, max });
  };

  let result = products.filter(p => {
    return (
      p.category === "laptop" &&
      (!appliedFilters.brand || p.make === appliedFilters.brand) &&
      (!appliedFilters.min || p.price >= Number(appliedFilters.min)) &&
      (!appliedFilters.max || p.price <= Number(appliedFilters.max))
    );
  });

  if (sortType === "low") {
    result.sort((a, b) => a.price - b.price);
  } else {
    result.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="layout">
      <aside className="sidebar">
        <Sidebar
          setBrand={setBrand}
          setMinPrice={setMin}
          setMaxPrice={setMax}
          applyFilters={applyFilters}
        />
      </aside>

      <main>
        <h2>{result.length} products</h2>

        <select value={sortType} onChange={(e) => setSortType(e.target.value)}>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>

        <div className="grid">
          {result.map(product => (
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