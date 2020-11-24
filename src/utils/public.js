import { v4 as uuidv4 } from 'uuid';

// 获取 32bit 的随机数
export function getUuid() {
  return uuidv4().replace(/-/g, '');
}
