export const uint8ArrayToBase64 = (uint8Array: Uint8Array) => String.fromCharCode(...uint8Array);

export const enableExtnames = ['jpg', 'jpeg', 'png'];

export const getExtName = (path: string): string => path.split('.').pop() ?? '';
