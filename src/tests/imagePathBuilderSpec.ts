import {
  addImgFileExt,
  getInputPath,
  getOutputPath,
  outputDir,
  inputDir,
  imgExt
} from '../utilities/imagePathBuilder';
import path from 'path';

describe('image path methods', () => {
  it('add extension to fileName', () => {
    const fileName = 'GreenBeans';
    expect(addImgFileExt(fileName)).toEqual(`${fileName}.${imgExt}`);
  });

  it('get file path for input image', () => {
    const fileName = 'GreenBeans';
    expect(getInputPath(fileName)).toEqual(
      path.join(inputDir, `${fileName}.${imgExt}`)
    );
  });

  it('get file path for output thumb image', () => {
    const fileName = 'GreenBeans';
    const width = 200;
    const height = 100;
    expect(getOutputPath(fileName, width, height)).toEqual(
      path.join(outputDir, `${fileName}_thumb_w${width}xh${height}.${imgExt}`)
    );
  });
});
