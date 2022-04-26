import { FC } from "react";
import ReactLoading from "react-loading";

import "./styles.scss";

const Loading: FC = () => (
  <div className="Loading">
    <ReactLoading
      type="spinningBubbles"
      color="blue"
      height={36}
      width={36}
    />
  </div>
);

export default Loading;
