import { Link } from "react-router-dom";

function PageNav() {
  return (
    <nav>
      <Link to="/">
        <img src="/logo.svg" alt="WorldWise logo" />
      </Link>
      <ul>
        <li>
          <Link to="/product">Product</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
