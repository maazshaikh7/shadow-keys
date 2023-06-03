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
      className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}
      style={{ borderBottom: "solid 2px lightblue" }}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          {props.title}
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href={"/About"}>
                About-us
              </a>
            </li>
          </ul>
          <div className="form-check form-switch px-4">
            <input
              className="form-check-input"
              onClick={props.toggleMode}
              type="checkbox"
              id="text-dark"
            />
            <label
              className="form-check-label"
              htmlFor="text-dark"
              style={{ color: "gray" }}
            >
              Switch mode
            </label>
          </div>
        </div>
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