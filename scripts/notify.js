const fs = require('fs');
const fetch = require('node-fetch');

const fileBuffer = fs.readFileSync('./job-url.txt');
const fileString = fileBuffer.toString();
const [version, url, type] = fileString.split('\n');

fetch(
  'https://open.feishu.cn/open-apis/bot/hook/036632bb-267e-4bfa-b48b-338cb56d9f44',
  {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      title: `您有新的 Meeting 发布版本（${version}），请注意查收`,
      text: `类型：${type}\n地址：${url.replace(
        '192.168.3.250',
        '192.168.3.250:8043',
      )}`,
    }),
  },
);
