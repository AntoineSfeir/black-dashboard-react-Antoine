import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
import PerfectScrollbar from "perfect-scrollbar";
import routes from "routes.js";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";

let ps;

function Sidebar(props) {
  const [setOpenSections] = useState({});
  const sidebarRef = useRef(null);

  useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebarRef.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1 && ps) {
        ps.destroy();
      }
    };
  }, []);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const activeRoute = (routeName) => {
    return window.location.pathname === routeName ? "active" : "";
  };

  const groupedRoutes = routes.reduce((acc, route) => {
    const category = route.category || "Other";
    if (!acc[category]) acc[category] = [];
    acc[category].push(route);
    return acc;
  }, {});

  // Inline style for category padding
  const categoryStyle = {
    padding: "10px 15px", // Adjust padding as needed
    fontWeight: "bold",
    color: "#ffffff", // Optional: Set text color
  };

  return (
    <BackgroundColorContext.Consumer>
      {({ color }) => (
        <div className="sidebar" data={color}>
          <div className="sidebar-wrapper" ref={sidebarRef}>
            <Nav>
              {Object.keys(groupedRoutes).map((category, key) => (
                <React.Fragment key={key}>
                  <li
                    className="nav-category"
                    onClick={() => toggleSection(category)}
                    style={categoryStyle} // Apply the inline style
                  >
                    <p>{category}</p>
                  </li>          
                    {groupedRoutes[category].map((prop, key) => (
                      <li key={key} className={activeRoute(prop.path) ? "active" : ""}>
                        <NavLink to={prop.layout + prop.path} className="nav-link">
                          <i className={prop.icon} />
                          <p>{prop.name}</p>
                        </NavLink>
                      </li>
                    ))}
                </React.Fragment>
              ))}
            </Nav>
          </div>
        </div>
      )}
    </BackgroundColorContext.Consumer>
  );
}

export default Sidebar;
