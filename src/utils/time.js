// 秒转成数码时间展示, 比如90 => 1:30
export const fromatSecondToDigital = (time) => {
  return `${Math.floor(time / 60)}:${time % 60}`;
};
