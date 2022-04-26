import { FC, ReactNode, useMemo } from 'react';
import ReactLoading from "react-loading";
import ru from "date-fns/locale/ru/index";
import { format } from 'date-fns';
import { IButtonProps } from './types';

import "./styles.scss";

const Button: FC<IButtonProps> = ({ name, loading, update, onClick }) => {
  const fetching = useMemo<ReactNode>(() =>
    loading && (
    <div className="Button__loading">
      <ReactLoading
        type="spokes"
        color="gray"
        height={18}
        width={18}
      />
    </div>
    ), [loading]);

  const lastUpdate = useMemo(() => (
    format(new Date(update), "dd MMMM yyyy 'в' HH:mm:ss", {
      locale: ru
    })
  ), [update]);

  return (
    <div className="Button">
      <div className="Button__label-fake" />
      <button
        className="Button__btn"
        disabled={loading}
        onClick={onClick}
      >{fetching || name}
      </button>
      <p className="Button__update-text">последние изменения {lastUpdate}</p>
    </div>
  );
};

export default Button;
