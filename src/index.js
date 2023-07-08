import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import StarRating from "./StarRating";

// function Test() {
//   const [s, setS] = useState(0);
//   return (
//     <div>
//       <StarRating color="orangered" maxRating={10} onSetRating={setS} />
//       <p>This movie was rated {s} stars!</p>
//     </div>
//   );
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating defaultRating={2} />
    <StarRating
      maxRating={5}
      color="blue"
      messages={["😡", "😠", "😐", "🙂", "😃"]}
    />
    <Test /> */}
  </React.StrictMode>
);
