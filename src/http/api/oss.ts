import http from '../request';

export const uploadFile = async (path: string, file: File) => {
  const data: any = await http.request({
    url: '/oss/get-policy',
    method: 'get',
    params: {
      path: path,
      fileName: file.name
    }
  });
  const policy = data.data;
  const oracleUrl = `https://${policy.host}/n/${policy.nameSpace}/b/${policy.bucket}/o/${policy.objKey}`;
  const headers = {
    'x-date': policy.date,
    Authorization: policy.signature,
    'Content-type': file.type
  };
  http.request({
    url: oracleUrl,
    method: 'put',
    data: file,
    headers: headers
  });
  return policy.objKey;
};
