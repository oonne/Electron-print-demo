/* 渲染状态 */
export enum RenderingStatus {
  preparing = 'preparing', // 等待打印信号
  requesting = 'requesting', // 请求数据
  rendering = 'rendering', // 渲染中
  error = 'error', // 报错
}
