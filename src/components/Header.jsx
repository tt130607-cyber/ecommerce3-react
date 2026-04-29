function Header({ setPageType, cart }) {

  const totalCount = Object.values(cart).reduce((sum, n) => sum + n, 0);
  return (
    <header className="header">

      {/* ЛОГОТИП */}
      <div onClick={() => setPageType("tv")}>
        TechStore
      </div>

      {/* НАВИГАЦИЯ */}
      <nav className="nav">
        <button onClick={() => setPageType("tv")}>TV</button>
        <button onClick={() => setPageType("phone")}>Phone</button>
        <button onClick={() => setPageType("laptop")}>Laptop</button>
      </nav>

      {/* ИКОНКИ */}
      <div className="header-icons">
        <span onClick={() => setPageType("cart")}>
            🛒 {totalCount}
        </span>
        <span className="icon">👤</span>
      </div>

    </header>
  );
}

export default Header;