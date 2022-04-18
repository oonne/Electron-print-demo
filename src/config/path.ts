interface Path {
  [propName: string]: string;
}

const path: Path = {
  index: '/', // 主进程控制页面

  print: '/print', // 打印渲染页
};

export default path;
