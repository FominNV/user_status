import { FC, MouseEvent, useCallback } from 'react';
import classNames from 'classnames';
import { ReactComponent as Check } from "assets/icons/Checkbox/check.svg";
import { ICheckboxProps } from './types';

import "./styles.scss";

const Checkbox: FC<ICheckboxProps> = ({ id, label, text, checked, setState }) => {
  const onClickHandler = useCallback<EventFunc<MouseEvent>>((e) => {
    e.preventDefault();
    setState((prev) => !prev);
  }, [setState]);

  const checkClassName = classNames("Checkbox__check", {
    Checkbox__check_active: checked
  });

  return (
    <div className="Checkbox">
      <label
        className="Checkbox__label"
        htmlFor={id}
      >
        {label}
      </label>

      <button
        className="Checkbox__btn-wrap"
        onClick={onClickHandler}
      >
        <div className="Checkbox__custom">
          <Check className={checkClassName} />
        </div>
        <div className="Checkbox__text">{text}</div>
      </button>
    </div>
  );
};

export default Checkbox;
