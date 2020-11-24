import React from 'react';
import { createContext, useReducer } from 'react';

// 创建 portal 的 context，存储编辑时产生的自定义 React block
const EditorContext = createContext({
  portals: {},
  createPortal: () => {},
  removePortal: () => {},
});

// 使用 reducer，因为每次变更数据依赖于上一次的值
const initialPortals = {};
function reducer(portals, action) {
  switch (action.type) {
    case 'createPortal':
      const fatPortals = { ...portals, [action.id]: action.portal };
      return fatPortals;
    case 'removePortal':
      const slimPortals = { ...portals };
      // 移除 portal
      delete slimPortals[action.id];
      return slimPortals;
    default:
      throw new Error();
  }
}

export const ContextProvider = ({ children }) => {
  const [portals, dispatch] = useReducer(reducer, initialPortals);
  const createPortal = (id, portal) => {
    dispatch({ type: 'createPortal', id, portal });
  };
  const removePortal = (id) => {
    dispatch({ type: 'removePortal', id });
  };
  return (
    <EditorContext.Provider value={{ portals, createPortal, removePortal }}>
      {children}
      {Object.keys(portals).map((id) => portals[id])}
    </EditorContext.Provider>
  );
};

export default EditorContext;
