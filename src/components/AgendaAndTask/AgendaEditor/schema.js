import { Schema } from 'prosemirror-model';

const brDOM = ['br'];

const calcYchangeDomAttrs = (attrs, domAttrs = {}) => {
  domAttrs = Object.assign({}, domAttrs);
  if (attrs.ychange !== null) {
    // domAttrs.ychange_user = attrs.ychange.user;
    // domAttrs.ychange_state = attrs.ychange.state;
  }
  return domAttrs;
};

// :: Object
// [Specs](#model.NodeSpec) for the nodes defined in this schema.
export const nodes = {
  // :: NodeSpec The top level document node.
  doc: {
    content: 'agendaItem*',
  },

  agendaItem: {
    attrs: {},
    content: 'header block*',
    toDOM(node) {
      return ['agendaItem', 0];
    },
    parseDOM: [{ tag: 'agendaItem' }],
    inclusive: false,
    draggable: true,
    defining: true,
    group: 'agendaItem',
  },

  todo: {
    attrs: {
      taskId: { default: null },
      creatorUid: { default: null }, // 任务创建者 id
      assigneeUid: { default: null }, // 负责人 id
      assigneeNickname: { default: null }, // 负责人姓名
      assigneeAvatar: { default: null }, // 负责人头像
      deadline: { default: null }, // 期限, ms 级, 精确到某天的零时零分零秒
      checked: { default: 0 }, // 0-未完成, 1-已完成
    },
    content: 'inline*',
    toDOM(node) {
      return ['todo', 0];
    },
    parseDOM: [{ tag: 'todo' }],
    inclusive: false,
    draggable: true,
    defining: true,
    group: 'block',
  },

  // :: NodeSpec A plain paragraph textblock. Represented in the DOM
  // as a `<p>` element.
  paragraph: {
    attrs: { ychange: { default: null } },
    content: 'inline*',
    group: 'block',
    parseDOM: [{ tag: 'p' }],
    // draggable: true,
    toDOM(node) {
      return ['p', calcYchangeDomAttrs(node.attrs), 0];
    },
    draggable: true,
  },

  // :: NodeSpec A blockquote (`<blockquote>`) wrapping one or more blocks.
  blockquote: {
    attrs: { ychange: { default: null } },
    content: 'block+',
    group: 'block',
    defining: true,
    parseDOM: [{ tag: 'blockquote' }],
    toDOM(node) {
      return ['blockquote', calcYchangeDomAttrs(node.attrs), 0];
    },
  },

  // :: NodeSpec A horizontal rule (`<hr>`).
  horizontal_rule: {
    attrs: { ychange: { default: null } },
    group: 'block',
    parseDOM: [{ tag: 'hr' }],
    toDOM(node) {
      return ['hr', calcYchangeDomAttrs(node.attrs)];
    },
  },

  // :: NodeSpec A heading textblock, with a `level` attribute that
  // should hold the number 1 to 6. Parsed and serialized as `<h1>` to
  // `<h6>` elements.
  // 每个 AgendaItem 的头部 (header--头部, 区别于 heading--标题)
  header: {
    attrs: {
      level: { default: 3 },
      // ychange: { default: null },
      startTime: { default: null }, // ms 级
      planDuration: { default: 900 }, // s 级, 默认 15 分钟(900 秒)
      realDuration: { default: null },
      isDone: { default: 0 },
    },
    content: 'inline*',
    defining: true,
    draggable: false,
    parseDOM: [
      { tag: 'h1', attrs: { level: 1 } },
      { tag: 'h2', attrs: { level: 2 } },
      { tag: 'h3', attrs: { level: 3 } },
      { tag: 'h4', attrs: { level: 4 } },
      { tag: 'h5', attrs: { level: 5 } },
      { tag: 'h6', attrs: { level: 6 } },
    ],
    toDOM(node) {
      return ['h' + node.attrs.level, calcYchangeDomAttrs(node.attrs), 0];
    },
  },

  // :: NodeSpec A code listing. Disallows marks or non-text inline
  // nodes by default. Represented as a `<pre>` element with a
  // `<code>` element inside of it.
  code_block: {
    attrs: { ychange: { default: null } },
    content: 'text*',
    marks: '',
    group: 'block',
    code: true,
    defining: true,
    parseDOM: [{ tag: 'pre', preserveWhitespace: 'full' }],
    toDOM(node) {
      return ['pre', calcYchangeDomAttrs(node.attrs), ['code', 0]];
    },
  },

  // :: NodeSpec The text node.
  text: {
    group: 'inline',
  },

  // :: NodeSpec An inline image (`<img>`) node. Supports `src`,
  // `alt`, and `href` attributes. The latter two default to the empty
  // string.
  image: {
    inline: true,
    attrs: {
      ychange: { default: null },
      src: {},
      alt: { default: null },
      title: { default: null },
    },
    group: 'inline',
    draggable: true,
    parseDOM: [
      {
        tag: 'img[src]',
        getAttrs(dom) {
          return {
            src: dom.getAttribute('src'),
            title: dom.getAttribute('title'),
            alt: dom.getAttribute('alt'),
          };
        },
      },
    ],
    toDOM(node) {
      const domAttrs = {
        src: node.attrs.src,
        title: node.attrs.title,
        alt: node.attrs.alt,
      };
      return ['img', calcYchangeDomAttrs(node.attrs, domAttrs)];
    },
  },

  // :: NodeSpec A hard line break, represented in the DOM as `<br>`.
  hard_break: {
    inline: true,
    group: 'inline',
    selectable: false,
    parseDOM: [{ tag: 'br' }],
    toDOM() {
      return brDOM;
    },
  },
};

const emDOM = ['em', 0];
const strongDOM = ['strong', 0];
const codeDOM = ['code', 0];

// :: Object [Specs](#model.MarkSpec) for the marks in the schema.
export const marks = {
  // :: MarkSpec A link. Has `href` and `title` attributes. `title`
  // defaults to the empty string. Rendered and parsed as an `<a>`
  // element.
  link: {
    attrs: {
      href: {},
      title: { default: null },
    },
    inclusive: false,
    parseDOM: [
      {
        tag: 'a[href]',
        getAttrs(dom) {
          return {
            href: dom.getAttribute('href'),
            title: dom.getAttribute('title'),
          };
        },
      },
    ],
    toDOM(node) {
      return ['a', node.attrs, 0];
    },
  },

  // :: MarkSpec An emphasis mark. Rendered as an `<em>` element.
  // Has parse rules that also match `<i>` and `font-style: italic`.
  italic: {
    parseDOM: [{ tag: 'i' }, { tag: 'em' }, { style: 'font-style=italic' }],
    toDOM() {
      return emDOM;
    },
  },

  // :: MarkSpec A strong mark. Rendered as `<strong>`, parse rules
  // also match `<b>` and `font-weight: bold`.
  bold: {
    parseDOM: [
      { tag: 'strong' },
      // This works around a Google Docs misbehavior where
      // pasted content will be inexplicably wrapped in `<b>`
      // tags with a font-weight normal.
      {
        tag: 'b',
        getAttrs: (node) => node.style.fontWeight !== 'normal' && null,
      },
      {
        style: 'font-weight',
        getAttrs: (value) => /^(bold(er)?|[5-9]\d{2,})$/.test(value) && null,
      },
    ],
    toDOM() {
      return strongDOM;
    },
  },

  strikeThrough: {
    parseDOM: [{ tag: 'i' }, { tag: 'em' }, { style: 'font-style=italic' }],
    toDOM() {
      return ['span', { style: 'text-decoration:line-through' }];
    },
  },

  // :: MarkSpec Code font mark. Represented as a `<code>` element.
  code: {
    parseDOM: [{ tag: 'code' }],
    toDOM() {
      return codeDOM;
    },
  },
  ychange: {
    attrs: {
      user: { default: null },
      state: { default: null },
    },
    inclusive: false,
    parseDOM: [{ tag: 'ychange' }],
    toDOM(node) {
      return [
        'ychange',
        { ychange_user: node.attrs.user, ychange_state: node.attrs.state },
        0,
      ];
    },
  },

  mention: {
    attrs: { username: {} },
    toDOM(node) {
      return ['a', { href: `https://twitter.com/${node.attrs.username}` }];
    },
    parseDOM: [
      {
        tag: 'a',
        getAttrs(dom) {
          return { href: dom.href };
        },
      },
    ],
    inclusive: false,
  },
};

// :: Schema
// This schema rougly corresponds to the document schema used by
// [CommonMark](http://commonmark.org/), minus the list elements,
// which are defined in the [`prosemirror-schema-list`](#schema-list)
// module.
//
// To reuse elements from this schema, extend or read from its
// `spec.nodes` and `spec.marks` [properties](#model.Schema.spec).
export const schema = new Schema({ nodes, marks });
