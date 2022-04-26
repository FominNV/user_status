import { FC } from "react";
import { Helmet } from "react-helmet-async";
import { IMainLayoutProps } from "./types";

import "./styles.scss";

const MainLayout: FC<IMainLayoutProps> = ({ children, title }) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <div className="MainLayout">
        {children}
      </div>
    </>
  );
};

export default MainLayout;
