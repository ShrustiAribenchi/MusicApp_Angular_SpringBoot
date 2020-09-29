import { browser, by, element, ElementFinder, promise } from 'protractor';

export class AlbumPage {
  // navigate to login page
  navigateToAlbum() {
    return browser.get('/album');
  }
  // get current URL
  getCurrentURL() {
    return browser.getCurrentUrl();
  }
 // navigate to  note view dashboard
  navigateToNoteView() {
    return browser.get('/album/');
  }
  // get login component
  getalbumComponent(): ElementFinder {
    return element(by.tagName('app-albums'));
  }
  // get submit button
  getSongsButton(): ElementFinder {
    return this.getalbumComponent().element(by.buttonText('Songs'));
  }
  // check submit button is present or not
  isSongsButtonPresent(): promise.Promise<boolean> {
    return this.getSongsButton().isPresent();
  }
  // click submit button
  clickSongsButton(): promise.Promise<void> {
    return this.getSongsButton().click();
  }
}
