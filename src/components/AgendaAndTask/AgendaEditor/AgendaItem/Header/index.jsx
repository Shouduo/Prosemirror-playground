import React, { forwardRef, useState, useEffect } from 'react';
import { Flex, Box, Tag, Progress } from '@chakra-ui/core';
import Dropdown from 'dropdown';
import Menu, { MenuItem, Divider } from 'menu';
import Tooltip from 'tooltip';
import { Play, Stop } from 'react-notticon';
import { AGENDA_DURATIONS } from '@/utils/constant';
import { fromatSecondToDigital } from '@/utils/time.js';
import ActionButton from './StartAndStopButton';

let timer = null;

const TimeSelector = ({ onSelect, onClick }) => (
  // 加 `onClick` 是为了让点击后关闭下拉菜单
  <Menu
    onClick={(e) => {
      onSelect(e);
      onClick(e);
    }}
  >
    {Object.keys(AGENDA_DURATIONS).map((key) => (
      <MenuItem key={key - 0}>{AGENDA_DURATIONS[key]}</MenuItem>
    ))}
    <Divider />
    <MenuItem key={0}>none</MenuItem>
  </Menu>
);

const CountdownSelector = ({ onSelect, onClick }) => (
  <Menu
    onClick={(e) => {
      onSelect(e);
      onClick(e);
    }}
  >
    <MenuItem key={1}>Add 1min</MenuItem>
    <MenuItem key={3}>Add 3mins</MenuItem>
    <MenuItem key={5}>Add 5mins</MenuItem>
    <MenuItem key={10}>Add 10mins</MenuItem>
  </Menu>
);

const Header = forwardRef(
  ({ children, dom, contentDOM, node, view, getPos, setAttrsAndType }, ref) => {
    const attrs = node.attrs;

    let [progress, setProgress] = useState(100);
    let [status, setStatus] = useState('initial');
    let [isDone, setIsDone] = useState(false);

    const level = node?.attrs.level;

    // const status = 'initial';
    const canStart = true;
    const leftTime = 90;
    // const progress = 50;
    const planDuration = 900;
    const duration = 900;
    const realDuration = 900;
    // const isDone = false;

    // const AgendaTitle extends Component {
    // constructor(props) {
    //   super(props);
    //   const data = props.block.getData();
    //   const planDuration = data.get('planDuration');
    //   this.timer = null;
    //   this.state = {
    //     // 该议程卡片状态
    //     // 'initial', 'countdown', 'done'
    //     status: 'initial',
    //     canStart: props.meetingStatus !== 1 && planDuration !== 0, // 会议进行中且有计划时间才可以开始
    //     leftTime: planDuration,
    //     addedDuration: 0,
    //     progress: 100,
    //   };
    // }

    const selectDuration = ({ key }) => {
      const duration = key - 0;
      // const { block, blockProps } = this.props;
      // const { onChange, getEditorState } = blockProps;
      // const data = block.getData();
      // const newData = data.set('planDuration', duration * 60);
      // onChange(updateDataOfBlock(getEditorState(), block, newData));
    };

    const modifyDuration = ({ key }) => {
      const addedTime = key - 0;
      const { leftTime, addedDuration } = this.state;
      this.setState({
        leftTime: leftTime + addedTime * 60,
        addedDuration: addedDuration + addedTime * 60,
      });
    };

    useEffect(() => {
      // const currentData = this.props.block.getData();
      // const prevData = prevProps.block.getData();
      // if (currentData.get('planDuration') !== prevData.get('planDuration')) {
      //   this.setState({
      //     canStart:
      //       this.props.meetingStatus !== 1 &&
      //       currentData.get('planDuration') !== 0,
      //   });
      // }

      if (attrs.isDone === 1) {
        timer = setInterval(() => {
          setProgress(progress--);
        }, 1000);
      }
    }, []);

    const startCount = () => {
      setAttrsAndType({ isDone: 1 });

      // setStatus('countdown');
      // timer = setInterval(() => {
      //   setProgress(progress--);
      // }, 1000);

      // const data = this.props.block.getData();
      // const planDuration = data.get('planDuration');

      // this.setState(
      //   {
      //     status: 'countdown',
      //     leftTime: planDuration,
      //   },
      //   () => {
      //     this.timer = setInterval(() => {
      //       const { leftTime, addedDuration } = this.state;
      //       if (leftTime === 0) {
      //         this.stopCount();
      //       }
      //       this.setState({
      //         leftTime: leftTime - 1,
      //         progress: ((leftTime - 1) * 100) / (planDuration + addedDuration),
      //       });
      //     }, 1000);
      //   },
      // );
    };

    const stopCount = () => {
      // 停止计时
      clearInterval(timer);
      setStatus('done');

      // const { block, blockProps } = this.props;
      // const { onChange, getEditorState } = blockProps;
      // const data = block.getData();
      // const { leftTime, addedDuration } = this.state;
      // const planDuration = data.get('planDuration');
      // // 实际时间等于计划时间减去剩余时间
      // const realDuration = planDuration + addedDuration - leftTime;
      // const newData = data.set('realDuration', realDuration).set('isDone', 1);
      // onChange(updateDataOfBlock(getEditorState(), block, newData));
      // this.setState({
      //   status: 'done',
      // });
    };

    const result = (planDuration, realDuration) => {
      const plan = `${Math.floor(planDuration / 60)}mins ${planDuration % 60}s`;
      if (planDuration > realDuration) {
        const saved = planDuration - realDuration;
        const savedTime = `${Math.floor(saved / 60)}mins ${saved % 60}s`;
        return `Estimated ${plan}, ${savedTime} saved`;
      } else {
        const exceeded = realDuration - planDuration;
        const exceededTime = `${Math.floor(exceeded / 60)}mins ${
          exceeded % 60
        }s`;
        return `Estimated ${plan}, ${exceededTime} exceeded`;
      }
    };

    // componentDidUpdate(prevProps) {
    //   const currentData = this.props.block.getData();
    //   const prevData = prevProps.block.getData();
    //   if (currentData.get('planDuration') !== prevData.get('planDuration')) {
    //     this.setState({
    //       canStart:
    //         this.props.meetingStatus !== 1 &&
    //         currentData.get('planDuration') !== 0,
    //     });
    //   }
    // }

    // const { block } = this.props;
    // const { status, canStart, leftTime, progress } = this.state;
    // const data = block.getData();
    // const planDuration = data.get('planDuration');
    // const duration = planDuration ? `${planDuration / 60}mins` : 'No duration';
    // const realDuration = data.get('realDuration');
    // const isDone = data.get('isDone');

    return (
      <Box mb="16px">
        {attrs.isDone === 1 && canStart && (
          <Progress
            value={progress}
            pos="absolute"
            top="0"
            left="0"
            w="full"
            h="4px"
            borderTopRadius="4px"
            colorScheme={progress < 10 ? 'red' : 'blue'}
            contentEditable={false}
          />
        )}

        <Flex justifyContent="space-between" alignItems="center">
          <Box
            flex="1"
            fontSize="22px"
            fontWeight="bold"
            lineHeight="26px"
            ref={ref}
          ></Box>
          {attrs.isDone === 2 ? (
            <Box userSelect="none" h="20px" contentEditable={false}>
              <Tooltip
                overlay={result(planDuration, realDuration)}
                placement="top"
                align={{ offset: [0, 2] }}
              >
                <Tag size="sm" bg="transparent" cursor="pointer">
                  {fromatSecondToDigital(realDuration)}
                </Tag>
              </Tooltip>
            </Box>
          ) : (
            <>
              {attrs.isDone === 0 && canStart && (
                <ActionButton
                  overlay="Start this item"
                  Icon={Play}
                  onClick={startCount}
                />
              )}
              {attrs.isDone === 1 && canStart && (
                <ActionButton
                  overlay="Stop this item"
                  Icon={Stop}
                  onClick={stopCount}
                />
              )}
              <Dropdown
                overlay={
                  attrs.isDone === 1 ? (
                    <CountdownSelector onSelect={modifyDuration} />
                  ) : (
                    <TimeSelector onSelect={selectDuration} />
                  )
                }
                trigger={['click']}
                placement="bottomCenter"
              >
                <Box userSelect="none" h="20px" contentEditable={false}>
                  <Tooltip
                    overlay="Change duration"
                    placement="top"
                    align={{ offset: [0, 2] }}
                  >
                    <Tag
                      size="sm"
                      bg="transparent"
                      _hover={{ bg: 'gray.100' }}
                      cursor="pointer"
                    >
                      {attrs.isDone === 1
                        ? fromatSecondToDigital(leftTime)
                        : duration}
                    </Tag>
                  </Tooltip>
                </Box>
              </Dropdown>
            </>
          )}
        </Flex>
      </Box>
    );
  },
);

// export default connect((state) => ({
//   meetingStatus: state.meetingBasic.status,
// }))(Header);
export default Header;
