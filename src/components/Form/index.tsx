import { FC, FormEvent, useCallback, useMemo, useState } from "react";
import FormHeader from "components/FormHeader";
import Input from "components/Input";
import Button from "components/Button";
import Select from "components/Select";
import Checkbox from "components/Checkbox";
import validator from "validator";

import { ICity, IUniversity } from "store/status/types";
import { useTypedSelector } from "store/selectors";
import { useDispatch } from "react-redux";
import {
  setCurrentCity,
  setCurrentUniversity,
  setUpdate
} from "store/status/actions";

import { CheckFieldType } from "./types";
import { dataCity } from "./data";

import "./styles.scss";

const Form: FC = () => {
  const { university, city, update, status } = useTypedSelector((state) => state.status);
  const [firstPassword, setFirstPassword] = useState<string>("");
  const [secondPassword, setSecondPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [errorfirstPassword, setErrorFirstPassword] = useState<Nullable<string>>(null);
  const [errorSecondPassword, setErrorSecondPassword] = useState<Nullable<string>>(null);
  const [errorEmail, setErrorEmail] = useState<Nullable<string>>(null);
  const [agreeReceiveInfo, setAgreeReceiveInfo] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(false);
  const dispatch = useDispatch();

  const checkFirstPassword = useCallback<CheckFieldType>(() => {
    if (!firstPassword.trim()) {
      setErrorFirstPassword("Укажите пароль");
      return false;
    }
    if (firstPassword.trim().length < 5) {
      setErrorFirstPassword("Используйте не менее 5 символов");
      return false;
    }

    setErrorFirstPassword(null);
    return true;
  }, [firstPassword]);

  const checkSecondPassword = useCallback<CheckFieldType>(() => {
    if (!secondPassword.trim()) {
      setErrorSecondPassword("Укажите пароль");
      return false;
    }
    if (firstPassword.trim() !== secondPassword.trim()) {
      setErrorSecondPassword("Пароли не совпадают");
      return false;
    }

    setErrorSecondPassword(null);
    return true;
  }, [firstPassword, secondPassword]);

  const checkEmail = useCallback<CheckFieldType>(() => {
    if (!email.trim()) {
      setErrorEmail("Укажите E-mail");
      return false;
    }
    if (!validator.isEmail(email)) {
      setErrorEmail("Неверный E-mail");
      return false;
    }

    setErrorEmail(null);
    return true;
  }, [email]);

  const onSubmitHandler = useCallback<EventFunc<FormEvent>>(
    async (e) => {
      e.preventDefault();
      if (!checkFirstPassword()) return;
      if (!checkSecondPassword()) return;

      if (agreeReceiveInfo) {
        if (!checkEmail()) return;
      } else {
        setErrorEmail(null);
      }

      setFetching(true);
      setTimeout(() => {
        console.log(
          JSON.stringify({
            university: university.current,
            city,
            email: agreeReceiveInfo && email,
            status
          })
        );
        dispatch(setUpdate(Date.now()));
        setFetching(false);
      }, 1200);
    },
    [
      university,
      city,
      email,
      status,
      agreeReceiveInfo,
      checkFirstPassword,
      checkSecondPassword,
      checkEmail,
      dispatch
    ]
  );

  const cities = useMemo<ICity[]>(() => {
    dataCity.sort((a, b) => Number(b.population) - Number(a.population));
    const maxPopulatioCity = dataCity[0];
    const filteredDataCity = dataCity.filter(
      (elem) =>
        Number(elem.population) > 50000 && elem.city !== maxPopulatioCity.city
    );
    return [maxPopulatioCity, ...filteredDataCity];
  }, []);

  const setCurrentCityByName = useCallback<VoidFunc<string>>(
    (name) => {
      cities.map((elem) => {
        if (elem.city === name) {
          dispatch(setCurrentCity(elem));
        }
      });
    },
    [cities, dispatch]
  );

  const setCurrentUniversityByName = useCallback<VoidFunc<string>>(
    (name) => {
      const universities = university.all as IUniversity[];
      universities.map((elem) => {
        if (elem.name === name) {
          dispatch(setCurrentUniversity(elem));
        }
      });
    },
    [university.all, dispatch]
  );

  const selectDataCity = useMemo<string[]>(
    () => cities.map((elem) => elem.city),
    [cities]
  );
  const selectDataUniversity = useMemo<Nullable<string[]>>(
    () => university.all && university.all.map((elem) => elem.name),
    [university.all]
  );

  useCallback(() => {
    if (selectDataCity && selectDataUniversity) {
      setCurrentCityByName(selectDataCity[0]);
      setCurrentUniversityByName(selectDataUniversity[0]);
    }
  }, [
    selectDataCity,
    selectDataUniversity,
    setCurrentCityByName,
    setCurrentUniversityByName
  ]);

  return (
    <form
      className="Form"
      onSubmit={onSubmitHandler}
    >
      <FormHeader />
      <div className="Form__block">
        <Select
          id="select_city"
          label="Ваш город"
          data={selectDataCity}
          callback={setCurrentCityByName}
        />
        <Select
          id="select_university"
          label="Ваш университет"
          data={selectDataUniversity}
          callback={setCurrentUniversityByName}
        />
      </div>

      <div className="Form__block Form__block_middle">
        <Input
          id="input_password"
          label="Пароль"
          type="password"
          error={errorfirstPassword}
          description="Ваш новый пароль должен содержать не менее 5 символов."
          setState={setFirstPassword}
        />
        <Input
          id="input_password_double"
          label="Пароль еще раз"
          type="password"
          error={errorSecondPassword}
          description="Повторите пароль, пожалуйста, это обезопасит вас с нами
          на случай ошибки."
          setState={setSecondPassword}
        />
      </div>

      <div className="Form__block">
        <Input
          id="input_email"
          label="Электронная почта"
          type="text"
          error={errorEmail}
          description="Можно изменить адрес, указанный при регистрации."
          setState={setEmail}
        />
        <Checkbox
          id="checkbox_info"
          label="Я согласен"
          text="принимать актуальную информацию на емейл"
          checked={agreeReceiveInfo}
          setState={setAgreeReceiveInfo}
        />
      </div>

      <Button
        name="Изменить"
        loading={fetching}
        update={update}
        onClick={onSubmitHandler}
      />
    </form>
  );
};

export default Form;
