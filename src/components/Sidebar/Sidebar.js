import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
import PerfectScrollbar from "perfect-scrollbar";
import routes from "routes.js";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";

let ps; // Declare PerfectScrollbar instance

function Sidebar(props) {
  const [setOpenSections] = useState({});
  const sidebarRef = useRef(null);

  // Initialize PerfectScrollbar on mount and clean up on unmount
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

  // Toggle collapse sections
  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Checks if the current route is active
  const activeRoute = (routeName) => {
    return window.location.pathname === routeName ? "active" : "";
  };

  // Group routes by category
  const groupedRoutes = routes.reduce((acc, route) => {
    const category = route.category || "Other";
    if (!acc[category]) acc[category] = [];
    acc[category].push(route);
    return acc;
  }, {});

  return (
    <BackgroundColorContext.Consumer>
      {({ color }) => (
        <div className="sidebar" data={color}>
          <div className="sidebar-wrapper" ref={sidebarRef}>
            <Nav>
              {Object.keys(groupedRoutes).map((category, key) => (
                <React.Fragment key={key}>
                  <li className="nav-category" onClick={() => toggleSection(category)}>
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
