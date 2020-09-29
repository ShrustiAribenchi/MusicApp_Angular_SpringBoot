import { AlbumPage } from './page/album.po';

describe('album page', () => {
  let page: AlbumPage;

  beforeEach(() => {
    page = new AlbumPage();
  });
/*
  it('should get Songs button', () => {
    page.navigateToAlbum();
    expect(page.isSongsButtonPresent()).toBeTruthy(`
    <button (click)="toggle('track')" class="btn btn-light btn-sm p-1">Songs</button> should
      exist in album.component.html`);
  });

*/
})