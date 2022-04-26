import { ChangeEvent, FC, MouseEvent, useCallback, useMemo, useRef, useState } from 'react';
import { ReactComponent as Show } from "assets/icons/Input/show.svg";
import { ReactComponent as Hide } from "assets/icons/Input/hide.svg";
import classNames from 'classnames';
import { IInputProps } from './types';

import "./styles.scss";

const Input: FC<IInputProps> = ({ id, label, type, error, description, setState }) => {
  const [innerValue, setInnerValue] = useState<string>("");
  const [innerType, setInnerType] = useState<string>("password");
  const input = useRef<HTMLInputElement | null>(null);

  const onChangeHandler = useCallback<EventFunc<ChangeEvent<HTMLInputElement>>>(
    (e) => {
      setInnerValue(e.currentTarget.value);
      setState(e.currentTarget.value);
    },
    [setState]
  );

  const clearInputValue = useCallback<EventFunc<MouseEvent>>(
    (e) => {
      e.preventDefault();
      setInnerValue("");
      setState("");
      input.current?.focus();
    },
    [setState]
  );

  const showPasswordHandler = useCallback<EventFunc<MouseEvent>>((e) => {
    e.preventDefault();
    if (innerType === "password") {
      setInnerType("text");
    } else {
      setInnerType("password");
    }
  }, [innerType]);

  const inputClassName = classNames("Input__input", {
    Input__input_error: error
  });
  const clearButtonClassName = classNames("Input__clear", {
    Input__clear_active: innerValue
  });
  const errorClassName = classNames("Input__error", {
    Input__error_active: error
  });
  const watchPassword = classNames("Input__watch-password", {
    "Input__watch-password_active": type === "password" && innerValue
  });

  const showButtonIcon = useMemo(
    () =>
      (innerType === "text" ? <Hide /> : <Show />),
    [innerType]
  );

  const currentType = type === "password" ? innerType : type;

  return (
    <div className="Input">
      <label
        className="Input__label"
        htmlFor={id}
      >
        {label}
      </label>

      <div className="Input__input-wrap">
        <input
          className={inputClassName}
          value={innerValue}
          type={currentType}
          ref={input}
          onChange={onChangeHandler}
          autoComplete="on"
        />
        <button
          className={clearButtonClassName}
          onClick={clearInputValue}
        >
          Очистить
        </button>
        <button
          className={watchPassword}
          onClick={showPasswordHandler}
        >
          {showButtonIcon}
        </button>
        <div className={errorClassName}>{error}</div>
      </div>

      <div className="Input__description">{description}</div>
    </div>
  );
};

export default Input;
