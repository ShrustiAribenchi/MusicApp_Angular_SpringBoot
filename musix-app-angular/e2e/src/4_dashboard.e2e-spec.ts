import { DashboardPage } from './page/dashboard.po';

describe('dashboard page', () => {
  let page: DashboardPage;

  beforeEach(() => {
    page = new DashboardPage();
  });

  it('should display Recommendation',() => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Top Recommended Artists');

  })
  /*
  it('should display title',() => {
    page.navigateTo();
    expect(page.getTitleText1()).toEqual('Top recommended Albums');

  })*/


});
