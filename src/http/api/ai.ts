import http from '../request';

// 请求AI
export const aiInvokeAsync: any = (sign: string, data: any) => {
  return http.request({
    url: '/ai/chat/' + sign,
    method: 'post',
    data: data,
    responseType: 'stream'
  });
};

// 取消请求
export const cancleAiInvokeAsync: any = () => {
  return http.cancelRequest('/huajian/ai/invoke');
};
