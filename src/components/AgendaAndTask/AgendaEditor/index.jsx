import React, { Component, createRef } from 'react';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { undo, redo, history } from 'prosemirror-history';
import { baseKeymap } from 'prosemirror-commands';
import { keymap } from 'prosemirror-keymap';
import applyDevTools from 'prosemirror-dev-tools';
import styled from '@emotion/styled';
import { Box } from '@chakra-ui/core';
import { createNodeViewFn } from './ReactNodeView';
import AgendaItem from './AgendaItem';
import Header from './AgendaItem/Header';
import Paragraph from './AgendaItem/Paragraph';
import Todo from './AgendaItem/Todo';
import { Mention } from './marks';
import EditorContext, { ContextProvider } from './context';
import { schema as ExtendedSchema } from './schema';
import { toggleMark } from './commands';
import { initialValue } from './utils';

const EditorContainer = styled(Box)`
  .ProseMirror {
    white-space: pre-wrap;
    &:focus {
      outline: none;
    }
    .ProseMirror-dom-heading {
      /* margin-bottom: 16px; */
    }
    .ProseMirror-dom-paragraph {
      /* margin-bottom: 12px; */
      &:last-child {
        margin-bottom: 0;
      }
    }
    .ProseMirror-yjs-cursor {
      position: relative;
      margin-left: -1px;
      margin-right: -1px;
      border-left: 1px solid black;
      border-right: 1px solid black;
      border-color: orange;
      word-break: normal;
      pointer-events: none;
    }
    /* This renders the username above the caret */
    .ProseMirror-yjs-cursor > div {
      position: absolute;
      top: -1.05em;
      left: -1px;
      font-size: 13px;
      background-color: rgb(250, 129, 0);
      font-family: serif;
      font-style: normal;
      font-weight: normal;
      line-height: normal;
      user-select: none;
      color: white;
      padding-left: 2px;
      padding-right: 2px;
      white-space: nowrap;
    }
  }
`;

export class AgendaEditor extends Component {
  static contextType = EditorContext;
  constructor(props) {
    super(props);
    this.editorElement = createRef();
    this.editorView = null;
    // 初始化编辑器状态
    this.editorState = EditorState.create({
      doc: ExtendedSchema.nodeFromJSON(initialValue),
      schema: ExtendedSchema,
      plugins: [
        history(),
        keymap(baseKeymap),
        keymap({ 'Mod-z': undo, 'Mod-Shift-z': redo }),
        keymap({ 'Mod-b': toggleMark(ExtendedSchema.marks.bold, {}) }),
        keymap({ 'Mod-i': toggleMark(ExtendedSchema.marks.italic, {}) }),
        keymap({ 'Mod-d': toggleMark(ExtendedSchema.marks.strikeThrough, {}) }),
      ],
    });
  }
  createEditorView = (element) => {
    const { onChange } = this.props;
    const { createPortal, removePortal } = this.context;
    // 创建编辑器视图
    const editorView = new EditorView(element, {
      state: this.editorState,
      nodeViews: {
        header: createNodeViewFn(Header, createPortal, removePortal),
        paragraph: createNodeViewFn(Paragraph, createPortal, removePortal),
        mention: createNodeViewFn(Mention, createPortal, removePortal),
        agendaItem: createNodeViewFn(AgendaItem, createPortal, removePortal),
        todo: createNodeViewFn(Todo, createPortal, removePortal),
      },
      dispatchTransaction(transaction) {
        const newState = editorView.state.apply(transaction);
        onChange(newState.doc.toJSON());
        editorView.updateState(newState);
      },
    });
    applyDevTools(editorView);
    this.editorView = editorView;
  };
  componentDidMount() {
    this.editorView = this.createEditorView(this.editorElement.current);
  }
  componentWillUnmount() {
    if (this.editorView) {
      this.editorView.destroy();
    }
  }
  // shouldComponentUpdate() {
  //   return false;
  // }
  render() {
    return <EditorContainer ref={this.editorElement} />;
  }
}

const Editor = (props) => (
  <ContextProvider>
    <AgendaEditor {...props} />
  </ContextProvider>
);

export default Editor;
