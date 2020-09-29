import { browser, by, element, ElementFinder, promise } from 'protractor';

export class DashboardPage {
  // navigate to home page
  navigateTo() {
    return browser.get('/dashboard/');
  }
  /* get header
  getHeader(): ElementFinder {
    return element(by.css('nav class'));  
  }
  // check header is present or not
  isHeaderPresent(): promise.Promise<boolean> {
    return this.getHeader().isPresent();
  }*/
  getTitleText(){
    return element(by.css('h2')).getText();
  }
  getTitleText1(){
    return element(by.className('dashboard-container-3')).getText();
}
}
