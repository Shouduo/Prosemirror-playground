import React, { createRef, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import shortid from "shortid";

class ReactNodeView {
  constructor({
    node,
    view,
    getPos,
    decorations,
    component,
    onCreatePortal,
    onRemovePortal,
  }) {
    this.node = node;
    this.view = view;
    this.getPos = getPos;
    this.decorations = decorations;
    this.component = component;
    this.componentRef = createRef();
    this.id = shortid.generate();
    this.onCreatePortal = onCreatePortal;
    this.onRemovePortal = onRemovePortal;
    this.init();
  }

  init() {
    // block 或 mark 最外层
    const isMark = !this.node.type.isBlock && !this.node.type.isText;
    this.dom = document.createElement(isMark ? "span" : "div");
    this.dom.classList.add(`ProseMirror-dom-${this.node.type.name}`);

    // 非末尾叶子节点，也就是说还有子节点
    if (!this.node.isLeaf) {
      // 先把可编辑 content 放到最外层内部
      this.contentDOM = document.createElement("span");
      this.contentDOM.classList.add("ProseMirror-content");
      this.contentDOM.style.width = "100%";
      this.contentDOM.style.display = "none";
      this.dom.appendChild(this.contentDOM);
    }

    const portal = this.renderPortal(this.dom);
    // 回调函数，告诉 context 那边新加一个 portal，以便将其挂载到应用中
    this.onCreatePortal(this.id, portal);
  }

  renderPortal(container) {
    // Block 组件
    const BlockComponent = (props) => {
      // 通过 component 属性传进来的 react 组件的 ref
      const componentRef = useRef(null);

      useEffect(() => {
        const componentDOM = componentRef.current;
        if (componentDOM !== null && this.contentDOM !== null) {
          if (!this.node.isLeaf) {
            // 把可编辑 content 放进组件内
            componentDOM.appendChild(this.contentDOM);
            this.contentDOM.style.display = "block";
          }
        }
      }, [componentRef]);
      return (
        <this.component
          {...props}
          dom={this.dom}
          contentDOM={this.contentDOM}
          node={this.node}
          view={this.view}
          getPos={this.getPos}
          setAttrsAndType={this.setAttrsAndType}
          ref={componentRef}
        />
      );
    };

    return createPortal(<BlockComponent />, container, this.id);
  }

  // stopEvent() {
  //   return true;
  // }

  ignoreMutation(mutation) {
    if (mutation.type === "attributes") {
      return true;
    }
    return false;
  }

  // update(node) {
  //   return false;
  // }

  destroy() {
    // 回调函数，告诉 context 那边移除一个 portal
    this.onRemovePortal(this.id);
    this.dom = undefined;
    this.contentDOM = undefined;
  }
  // 修改 block 的 attrs (和 type)
  setAttrsAndType = (newAttrs = {}, newType) => {
    this.view.dispatch(
      this.view.state.tr.setNodeMarkup(
        this.getPos(),
        this.view.state.schema.nodes[newType],
        {
          ...this.node.attrs,
          ...newAttrs,
        }
      )
    );
  };
}

export const createNodeViewFn = (component, onCreatePortal, onRemovePortal) => {
  return (node, view, getPos, decorations) => {
    const nodeView = new ReactNodeView({
      node,
      view,
      getPos,
      decorations,
      component,
      onCreatePortal,
      onRemovePortal,
    });
    return nodeView;
  };
};

export default ReactNodeView;
