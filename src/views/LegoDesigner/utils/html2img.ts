import html2canvas from 'html2canvas';

const getImgBase64URL = (el: any): Promise<string> => {
  // html2canvas(el, {
  //   width: el.clientWidth, //dom 原始宽度
  //   height: el.clientHeight,
  //   allowTaint: true, //允许污染
  //   taintTest: true, //在渲染前测试图片
  //   // useCORS: true, //开启跨域配置，但和allowTaint不能共存
  // }.then((img: any) => {})
  return new Promise((resolve, reject) => {
    html2canvas(el, {
      useCORS: true,
      scale: 1
    })
      .then((canvas) => {
        const dataURL = canvas.toDataURL('image/jpeg', 0.1);
        resolve(dataURL);
      })
      .catch(() => {
        reject('');
      });
  });
};

const base64ToFile = (base64String: string, fileName = 'resume-preview.file') => {
  // 1. 分割 Base64 数据（分离 MIME 类型和实际数据）
  const parts = base64String.split(';base64,');
  const mimeType = parts[0].split(':')[1]; // 例如 "image/png"
  const base64Data = parts[1];

  // 2. 将 Base64 转换为 ArrayBuffer
  const bytes = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));
  const blob = new Blob([bytes], { type: mimeType });

  // 3. 创建 File 对象
  return new File([blob], fileName, { type: mimeType });
};

export { getImgBase64URL, base64ToFile };
