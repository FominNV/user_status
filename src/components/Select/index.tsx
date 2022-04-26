import {
  FC,
  FocusEvent,
  MouseEvent,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";
import { ReactComponent as Arrow } from "assets/icons/Select/arrow.svg";
import classNames from "classnames";
import { ISelectProps } from "./types";

import "./styles.scss";

const Select: FC<ISelectProps> = ({ id, label, data, callback }) => {
  const [innerValue, setInnerValue] = useState<string>("");
  const [showDataBlock, setShowDataBlock] = useState<boolean>(false);

  const onClickHandler = useCallback<
    EventFunc<MouseEvent<HTMLButtonElement | HTMLInputElement>>
  >((e) => {
    e.preventDefault();
    setShowDataBlock(!showDataBlock);
  }, [showDataBlock]);

  const onMouseDownHandler = useCallback<
    EventFunc<MouseEvent<HTMLButtonElement>>
  >(
    (e) => {
      e.preventDefault();
      callback(e.currentTarget.name);
      setInnerValue(e.currentTarget.name);
    },
    [callback]
  );

  const onBlurHandler = useCallback<EventFunc<FocusEvent>>(() => {
    setShowDataBlock(false);
  }, []);

  const dataList = useMemo<ReactNode>(
    () =>
      data &&
      data.map((elem, index) => (
        <button
          className="Select__data-block__btn"
          key={id + index}
          name={elem}
          onClick={onClickHandler}
          onMouseDown={onMouseDownHandler}
        >
          {elem}
        </button>
      )),
    [data, id, onClickHandler, onMouseDownHandler]
  );

  useEffect(() => {
    if (data) {
      callback(data[0]);
      setInnerValue(data[0]);
    }
  }, [data, callback]);

  const dataBlockClassName = classNames("Select__data-block", {
    "Select__data-block_active": showDataBlock
  });

  return (
    <div className="Select">
      <label
        className="Select__label"
        htmlFor={id}
      >
        {label}
      </label>

      <div className="Select__select-wrap">
        <input
          id={id}
          type="text"
          className="Select__select"
          value={innerValue}
          name={label}
          onBlur={onBlurHandler}
          onClick={onClickHandler}
          autoComplete="off"
          readOnly
        />
        <div className="Select__arrow">
          <Arrow />
        </div>

        <div className={dataBlockClassName}>{dataList}</div>
      </div>

      <div className="Select__fake-description" />
    </div>
  );
};

export default Select;
