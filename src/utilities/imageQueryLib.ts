// Ensures query parameter is a string.
const getParamString = (value: unknown): string => {
  if (Array.isArray(value)) {
    value = value[0];
  }
  return value as string;
};

const getParamNum = (value: unknown): number | null => {
  if (Array.isArray(value)) {
    value = value[0];
  }
  let num: number | null = parseInt(value as string);
  num = isNaN(num) ? null : num;
  return num;
};

const isValidParam = (value: unknown): boolean => {
  if (typeof value === 'undefined') {
    return true;
  }
  return !isNaN(parseInt(value as string));
};

// Image param type - an array of image query parameters from the request
type ImgQParams = [name: string, width: string, height: string];

// Processes image query parameters and returns array of parameters in correct form.
const getImageQueryParams = (
  qparams: ImgQParams
): [string, number | null, number | null] => {
  const [imgName, imgWidth, imgHeight] = qparams;
  const name = getParamString(imgName);

  const width = getParamNum(imgWidth);
  const height = getParamNum(imgHeight);

  return [name, width, height];
};

export { getImageQueryParams, isValidParam };
