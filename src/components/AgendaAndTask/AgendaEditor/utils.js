export const initialValue = {
  type: 'doc', // proseMirror 默认最外层类型(必要时可修改)
  attrs: {
    meetingId: 'c3d842bc127e11ebbf3800224866f94d', // 会议 id
  },
  content: [
    {
      type: 'agendaItem', // agendaItem 即为单个议程卡片
      content: [
        {
          type: 'header', // 标题
          attrs: {
            startTime: 1605499733000, // ms 级
            planDuration: 900, // s 级, 默认 15 分钟(900 秒)
            realDuration: 1200,
            isDone: 0, // 0-未开始 ,1-进行中 ,2-已结束
          },
          content: [
            {
              type: 'text',
              text: 'this is a header',
            },
          ],
        },
        {
          type: 'paragraph', // 普通段落
          content: [
            {
              type: 'text',
              text: 'this is a paragraph.',
            },
          ],
        },
        {
          type: 'paragraph', // 有内部样式的段落
          content: [
            {
              type: 'text',
              text: 'this is a richtext paragraph with ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'bold', // 加粗
                },
              ],
              text: 'bold, ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'italic', // 斜体
                },
              ],
              text: 'italic, ',
            },
            {
              type: 'text',
              marks: [
                {
                  type: 'strikeThrough', // 删除线
                },
              ],
              text: 'strikeThrough.',
            },
          ],
        },
        {
          type: 'todo', // 任务
          attrs: {
            taskId: '',
            creatorUid: 'notta28b2c8e2056911ebbfd000224866f94d', // 任务创建者 id
            assigneeUid: 'notta3329c8e2605011ebbfd00022414785av', // 负责人 id
            assigneeNickname: '王', // 负责人姓名
            assigneeAvatar: '', // 负责人头像
            deadline: 1607702400000, // 期限, ms 级, 精确到某天的零时零分零秒
            checked: 0, // 0-未完成, 1-已完成
          },
          content: [
            {
              type: 'text',
              text: 'this is a todo.',
            },
          ],
        },
      ],
    },
    {
      type: 'agendaItem', // agendaItem 即为单个议程卡片
      content: [
        {
          type: 'header', // 标题
          attrs: {
            startTime: 1605499733000, // ms 级
            planDuration: 900, // s 级, 默认 15 分钟(900 秒)
            realDuration: 1200,
            isDone: 0, // 0-未开始 ,1-进行中 ,2-已结束
          },
          content: [
            {
              type: 'text',
              text: 'this is a header',
            },
          ],
        },
        {
          type: 'todo', // 任务
          attrs: {
            taskId: '',
            creatorUid: 'notta28b2c8e2056911ebbfd000224866f94d', // 任务创建者 id
            assigneeUid: 'notta3329c8e2605011ebbfd00022414785av', // 负责人 id
            assigneeNickname: '王', // 负责人姓名
            assigneeAvatar: '', // 负责人头像
            deadline: 1607702400000, // 期限, ms 级, 精确到某天的零时零分零秒
            checked: 0, // 0-未完成, 1-已完成
          },
          content: [
            {
              type: 'text',
              text: 'this is a todo.',
            },
          ],
        },
        {
          type: 'todo', // 任务
          attrs: {
            taskId: '',
            creatorUid: 'notta28b2c8e2056911ebbfd000224866f94d', // 任务创建者 id
            assigneeUid: 'notta3329c8e2605011ebbfd00022414785bv', // 负责人 id
            assigneeNickname: '赵', // 负责人姓名
            assigneeAvatar: '', // 负责人头像
            deadline: 1607702400000, // 期限, ms 级, 精确到某天的零时零分零秒
            checked: 1, // 0-未完成, 1-已完成
          },
          content: [
            {
              type: 'text',
              text: 'this is another todo.',
            },
          ],
        },
      ],
    },
  ],
};

/**
 * 检查整个范围内给定范围是否具有给定标记或标记类型
 * @param {*} from
 * @param {*} to
 * @param {*} mark
 */
export function entireRangeHasMark(from, to, mark) {
  return function entireRangeHasMarkInner(state) {
    let markInstance,
      hasMark = true;
    state.doc.nodesBetween(from, to, (node) => {
      if (!hasMark) return false;
      if (!node.type.isText) return true;
      markInstance = mark.isInSet(node.marks) ?? undefined;
      hasMark = !!markInstance;
      return false;
    });
    return markInstance;
  };
}
