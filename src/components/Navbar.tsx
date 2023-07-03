import PropTypes from "prop-types";
import "../index.css";
type navProps = {
  mode: string;
  title: string;
  toggleMode: () => void;
};

export default function Navbar(props: navProps) {
  return (
    <nav
      className={`navbar navbar-expand-lg navbar-dark`}
      style={{ borderBottom: "solid 2px white" }}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          {props.title}
        </a>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  aboutText: PropTypes.string,
};

// Navbar.defaultProps = {
//     title : "set title here",
//     aboutText : "about text here",
//     };
