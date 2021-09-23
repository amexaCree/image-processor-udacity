import path from 'path';

const imgBaseDir = path.join(__dirname, '..', '..', 'assets');
const inputDir = path.join(imgBaseDir, 'full');
const outputDir = path.join(imgBaseDir, 'thumb');
const outputaffix = '_thumb';
const imgExt = 'jpg';

// adds img extenstion to file name
const addImgFileExt = (fileName: string): string => {
  return `${fileName}.${imgExt}`;
};

// generates input image path
const getInputPath = (fileName: string): string => {
  return path.join(inputDir, addImgFileExt(fileName));
};

// generates output path for thumbed image
const getOutputPath = (fileName: string): string => {
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
