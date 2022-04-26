import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Main from "pages/Main";

import "./styles.scss";

const App: FC = () => (
  <Routes>
    <Route
      path="/user_status"
      element={<Main />}
    />
  </Routes>
);

export default App;
