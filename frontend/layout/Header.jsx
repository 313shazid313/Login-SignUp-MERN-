import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> &nbsp;
        <Link to="/register">Registration</Link>&nbsp;
        <Link to="/login">Login</Link>&nbsp;
        <Link to="/profile">Profile</Link>&nbsp;
      </nav>
    </div>
  );
};

export default Header;
