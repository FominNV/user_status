import {
  FC,
  ChangeEvent,
  FocusEvent,
  MouseEvent,
  useCallback,
  useRef,
  useState,
  KeyboardEvent
} from "react";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "store/selectors";
import { setStatus } from "store/status/actions";

import "./styles.scss";

const FormHeader: FC = () => {
  const { status } = useTypedSelector((state) => state.status);
  const [showTextarea, setShowTextarea] = useState<boolean>(false);
  const [textareaValue, setTextareaValue] = useState<string>(status);
  const textarea = useRef<HTMLTextAreaElement | null>(null);
  const dispatch = useDispatch();

  const onChangeHandler = useCallback<
    EventFunc<ChangeEvent<HTMLTextAreaElement>>
  >((e) => {
    e.preventDefault();
    setTextareaValue(e.currentTarget.value);
  }, []);

  const onKeypressHandler = useCallback<
    EventFunc<KeyboardEvent<HTMLTextAreaElement>>
  >(
    (e) => {
      if (e.key === "Enter") {
        dispatch(setStatus(textareaValue.trim()));
        setShowTextarea(false);
      }
    },
    [textareaValue, dispatch]
  );

  const onBlurHandler = useCallback<EventFunc<FocusEvent>>(() => {
    setShowTextarea(false);
  }, []);

  const onClickHandler = useCallback<EventFunc<MouseEvent>>((e) => {
    e.preventDefault();
  }, []);

  const onMouseDownHandler = useCallback<EventFunc<MouseEvent>>(
    (e) => {
      e.preventDefault();
      if (showTextarea) {
        dispatch(setStatus(textareaValue.trim()));
      } else {
        setTimeout(() => {
          textarea.current?.focus();
        }, 350);
      }
      setShowTextarea(!showTextarea);
    },
    [showTextarea, textareaValue, dispatch]
  );

  const buttonStatusName = showTextarea ? "Сохранить статус" : "Сменить статус";
  const textareaClassName = classNames("FormHeader__textarea", {
    FormHeader__textarea_active: showTextarea
  });

  return (
    <div className="FormHeader">
      <p className="FormHeader__greeting">Здравствуйте, </p>

      <div className="FormHeader__userblock">
        <div className="FormHeader__userblock_item">
          <p className="FormHeader__username">Человек №3596941</p>
          <button
            className="FormHeader__change-status"
            onMouseDown={onMouseDownHandler}
            onClick={onClickHandler}
          >
            {buttonStatusName}
          </button>
        </div>

        <div className="FormHeader__userblock_item">
          <div className="FormHeader__status">
            <div className="FormHeader__square" />
            {status}

            <textarea
              className={textareaClassName}
              name="status"
              id="status"
              ref={textarea}
              maxLength={100}
              defaultValue={textareaValue}
              onChange={onChangeHandler}
              onBlur={onBlurHandler}
              onKeyDown={onKeypressHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormHeader;
