import { LoginPage } from './page/login.po';

describe('login page', () => {
  let page: LoginPage;

  beforeEach(() => {
    page = new LoginPage();
  });
/*
  it('should get email input box', () => {
    page.navigateToLogin();
    expect(page.isUserNameInputBoxPresent())
    .toBeTruthy(`<input type="email" class="form-control" id="exampleInputEmail1"> should exist in login.component.html`);
  });

  it('should get passsword input box', () => {
    page.navigateToLogin();
    expect(page.isPasswordInputBoxPresent())
    .toBeTruthy(`<input type="password" class="form-control" id="exampleInputPassword1" >
      should exist in login.component.html`);
  });

  
*/
  it('should get submit button', () => {
    page.navigateToLogin();
    expect(page.isSubmitButtonPresent()).toBeTruthy(`
    <button  type="submit" class="btn btn-danger">Login</button> should
      exist in login.component.html`);
  });

  it('default values of username and password should be empty', () => {
    const emptyLoginValues = ['', ''];
    page.navigateToLogin();
    expect(page.getLoginInputBoxesDefaultValues()).toEqual(emptyLoginValues, 'Default values for username and password should be empty');
  });



 /* it('should login into the system', () => {
    page.navigateToLogin();
    let newNoteValues = page.addLoginValues();
    expect(page.getLoginInputBoxesDefaultValues()).toEqual(newNoteValues, 'Should be able to set values for username and password');
    page.clickSubmitButton();
    page.navigateToNoteView();
    page.getCurrentURL().then((url) => {
      if (url.indexOf('login') > -1) {
        newNoteValues = page.addLoginValues();
        page.clickSubmitButton();
        page.navigateToNoteView();
        expect(page.getCurrentURL()).toContain('dashboard/', 'Should navigate to dashboard');
      } else {
        expect(page.getCurrentURL()).toContain('dashboard/', 'Should navigate to dashboard');
      }
    });
  });*/
});
