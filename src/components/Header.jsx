import "./Header.css";

const Header = ({ title, leftChild, rigthChild }) => {
  return (
    <header className="Header">
      <div className="header_left">{leftChild}</div>
      <div className="header_center">{title}</div>
      <div className="header_rigth">{rigthChild}</div>
    </header>
  );
};

export default Header;
