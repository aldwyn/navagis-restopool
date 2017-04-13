import { RestopoolPage } from './app.po';

describe('restopool App', () => {
  let page: RestopoolPage;

  beforeEach(() => {
    page = new RestopoolPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
