function SearchBar({ searchTerm, setSearchTerm, onSearch }) {
  return (
    <form className="search-form" onSubmit={onSearch}>
      <input
        type="text"
        placeholder="Search for a recipe..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <button type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchBar;