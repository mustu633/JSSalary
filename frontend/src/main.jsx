// new :

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { UserProvider } from "./components/UserContext.jsx";

// Bootstrap CSS & JS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);







//old:

// import { createRoot } from "react-dom/client";
// // import "./index.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.min.js";
// import App from "./App.jsx";
// import { UserProvider } from "./components/UserContext.jsx";
// createRoot(document.getElementById("root")).render(
//   <>
//   <UserProvider>
//       <App />
//     </UserProvider>
//   </>
// );
