import React, { createContext, useState } from 'react';

const ModalContext = createContext({
  component: null,
  props: {},
  showModal: (component: any, props?: {}) => {},
  hideModal: () => {},
});
export const ModalConsumer = ModalContext.Consumer;

export const ModalProvider = ({ children }: any) => {
  const showModal = (component: any, props = {}) => {
    setState({
      ...state,
      component,
      props,
    });
  };

  const hideModal = () =>
    setState({
      ...state,
      component: null,
      props: {},
    });

  const [state, setState] = useState({
    component: null,
    props: {},
    showModal: showModal,
    hideModal: hideModal,
  });

  return (
    <ModalContext.Provider value={state}>{children}</ModalContext.Provider>
  );
};
