import { AppPage } from './page/app.po';

describe('home page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });
/*
  it('should check header presentation on home page', () => {
    page.navigateTo();
    expect(page.isHeaderPresent()).toBeTruthy('<nav class> should exist in header.component.html');
  });*/

  
  it('should display title',() => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Musix-App');

  })


});
