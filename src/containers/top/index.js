import React, {useCallback} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import useTranslate from "@src/hooks/use-translate";
import LayoutFlex from "@src/components/layouts/layout-flex";
import useSelector from "@src/hooks/use-selector";
import useStore from "@src/hooks/use-store";

function TopContainer() {
  const navigate = useNavigate();
  const location = useLocation();
  const store = useStore();
  const select = useSelector(state => ({
    user: state.session.user,
    exists: state.session.exists
  }))

  const {t} = useTranslate();

  const callbacks = {
    // Открыть модалку каталога
    onOpen: useCallback(() => {
      store.get('modals').create('catalogModal');
      store.get('modals').open('catalogModal');
    }, []),
    // Переход к авторизации
    onSignIn: useCallback(() => {
      navigate('/login', {state: {back: location.pathname}});
    }, [location.pathname]),

    // Отмена авторизации
    onSignOut: useCallback(() => {
      store.get('session').signOut();
    }, [location.pathname]),
  };

  return (
    <LayoutFlex flex="end" indent="small">
      <button onClick={callbacks.onOpen}>Открыть модалку каталога</button>
      {select.exists && <Link to="/profile">{select.user.profile.name}</Link>}
      {select.exists
        ? <button onClick={callbacks.onSignOut}>{t('session.signOut')}</button>
        : <button onClick={callbacks.onSignIn}>{t('session.signIn')}</button>
      }
    </LayoutFlex>
  );
}

export default React.memo(TopContainer);
