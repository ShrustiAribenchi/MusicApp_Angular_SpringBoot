import { RegisterPage } from './page/register.po';

describe('register page', () => {
  let page: RegisterPage;

  beforeEach(() => {
    page = new RegisterPage();
  });

  it('should get email input box', () => {
    page.navigateToRegister();
    expect(page.isEmailInputBoxPresent())
    .toBeTruthy(`<input type="email" name="email" class= "form-control form-control-lg"> should exist in register.component.html`);
  });

  it('should get username input box', () => {
    page.navigateToRegister();
    expect(page.isUserNameInputBoxPresent())
    .toBeTruthy(`<input type="text" name="username" class= "form-control form-control-lg"> should exist in register.component.html`);
  });

  it('should get passsword input box', () => {
    page.navigateToRegister();
    expect(page.isPasswordInputBoxPresent())
    .toBeTruthy(`<input type="password" name="password" class= "form-control form-control-lg>
      should exist in register.component.html`);
  });

  it('should get confirm passsword input box', () => {
    page.navigateToRegister();
    expect(page.isConfirmPasswordInputBoxPresent())
    .toBeTruthy(` <input type="password" name="confirm password" class= "form-control form-control-lg">
      should exist in register.component.html`);
  });
/*
  it('should get registert button', () => {
    page.navigateToRegister();
    expect(page.isRegisterButtonPresent()).toBeTruthy(`
    <button (click)="registerUser()" type="submit" class="btn btn-danger btn-block" >Register</button> should
      exist in register.component.html`);
  });
*/


/*
  it('default values of username and password should be empty', () => {
    const emptyLoginValues = ['', '', '', ''];
    page.navigateToRegister();
    expect(page.getRegisterInputBoxesDefaultValues()).toEqual(emptyLoginValues, 'Default values for username,email,confirm password and password should be empty');
  });*/
});