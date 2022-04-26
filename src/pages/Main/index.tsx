import { FC, useCallback, useEffect, useMemo } from "react";
import { useTypedSelector } from "store/selectors";
import { useDispatch } from "react-redux";
import { getUniversities, setLoading } from "store/status/actions";
import MainLayout from "layouts/MainLayout";
import Container from "components/Container";
import Loading from "components/Loading";
import Form from "components/Form";

import "./styles.scss";

const Main: FC = () => {
  const { loading } = useTypedSelector((state) => state.status);
  const dispatch = useDispatch();

  const loadUniversities = useCallback(async () => {
    dispatch(setLoading(true));
    await dispatch(getUniversities());
    dispatch(setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    loadUniversities();
  }, [loadUniversities]);

  const content = useMemo(() => (
    loading ? <Loading /> : <Form />
  ), [loading]);

  return (
    <MainLayout title="UserStatus">
      <div className="Main">
        <Container>
          <main className="Main__content">
            {content}
          </main>
        </Container>
      </div>
    </MainLayout>
  );
};

export default Main;
