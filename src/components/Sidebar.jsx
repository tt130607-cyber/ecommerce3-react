export default function Sidebar({ setBrand, setMinPrice, setMaxPrice, applyFilters }) {
  return (
    <div>
      <h3>Filters</h3>

      {/* BRAND */}
      <div className="filter-group">
        <label>Brand</label>
        <select onChange={(e) => setBrand(e.target.value)}>
          <option value="">All</option>
          <option value="Samsung">Samsung</option>
          <option value="LG">LG</option>
          <option value="Sony">Sony</option>
          <option value="Apple">Apple</option>
          <option value="TCL">TCL</option>
          <option value="Hisense">Hisense</option>
          <option value="Xiaomi">Xiaomi</option>
          <option value="ASUS">ASUS</option>
          <option value="Google">Google</option>
          <option value="OnePlus">OnePlus</option>
          <option value="Dell">Dell</option>
          <option value="Lenovo">Lenovo</option>
          <option value="HP">HP</option>
          <option value="Microsoft">Microsoft</option>
          <option value="Acer">Acer</option>
        </select>
      </div>

      {/* PRICE */}
      <div className="filter-group">
        <label>Price</label>
        <div className="price-inputs">
          <input
            type="number"
            placeholder="Min"
            onChange={(e) => setMinPrice(Number(e.target.value))}
          />
          <input
            type="number"
            placeholder="Max"
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>
      </div>

      <button className="apply-btn" onClick={applyFilters}>
  Apply Filters
</button>

      <div className="deal-banner">
        <h4>Special Deal</h4>
        <p>00:59:59</p>
      </div>
    </div>
  );
}