import { MaterialLoaderModule } from './material-loader.module';

describe('MaterialLoaderModule', () => {
  let materialLoaderModule: MaterialLoaderModule;

  beforeEach(() => {
    materialLoaderModule = new MaterialLoaderModule();
  });

  it('should create an instance', () => {
    expect(materialLoaderModule).toBeTruthy();
  });
});
