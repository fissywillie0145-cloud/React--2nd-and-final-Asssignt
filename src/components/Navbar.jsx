import { Link } from "react-router";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        Recipe<span>Finder</span>
      </Link>

      <Link to="/" className="home-link">
        Home
      </Link>
{/* 
        <Link to="/" className="Recipe-link">
        RecipeDL
      </Link> */}

      <Link to="/recipe/52772" className="home-link">
  Recipe Details
</Link>
      
    </nav>
  );
}

export default Navbar;