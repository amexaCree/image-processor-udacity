import path from 'path';

const imgBaseDir = path.join(__dirname, '..', '..', 'assets');
const inputDir = path.join(imgBaseDir, 'full');
const outputDir = path.join(imgBaseDir, 'thumb');
const thumbaffix = '_thumb';
const imgExt = 'jpg';

// adds img extenstion to file name
const addImgFileExt = (fileName: string): string => {
  return `${fileName}.${imgExt}`;
};

// generates input image path
const getInputPath = (fileName: string): string => {
  return path.join(inputDir, addImgFileExt(fileName));
};

const getOutputAffix = (
  width: number | null,
  height: number | null
): string => {
  return `${thumbaffix}_w${width ? width : ''}xh${height ? height : ''}`;
};

// generates output path for thumbed image
const getOutputPath = (
  fileName: string,
  width: number | null,
  height: number | null
): string => {
  const outputaffix = getOutputAffix(width, height);
  const name = addImgFileExt(fileName + outputaffix);
  return path.join(outputDir, name);
};

export {
  addImgFileExt,
  getInputPath,
  getOutputPath,
  imgBaseDir,
  outputDir,
  inputDir,
  imgExt
};
