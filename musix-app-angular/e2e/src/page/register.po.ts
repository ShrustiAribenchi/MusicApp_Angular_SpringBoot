import { browser, by, element, ElementFinder, promise } from 'protractor';

export class RegisterPage {
  // navigate to register page
  navigateToRegister() {
    return browser.get('/register');
  }
  // get current URL
  getCurrentURL() {
    return browser.getCurrentUrl();
  }
 // navigate to  note view dashboard
  navigateToNoteView() {
    return browser.get('/dashboard/');
  }
  // get register component
  getregisterComponent(): ElementFinder {
    return element(by.tagName('app-register'));
  }

  // get Email input box
  getEmailInputBox(): ElementFinder {
    return element(by.className('form-group'));
  }
  // check Email input box is exist or not
  isEmailInputBoxPresent(): promise.Promise<boolean> {
    return this.getEmailInputBox().isPresent();
  }
  
  // get confirm password input box
  getConfirmPasswordInputBox(): ElementFinder {
    return element(by.className('form-group'));
  }
  // check confirm password input box is exist or not
  isConfirmPasswordInputBoxPresent(): promise.Promise<boolean> {
    return this.getConfirmPasswordInputBox().isPresent();
  }
  
  // get username input box
  getUserNameInputBox(): ElementFinder {
    return element(by.className('form-group'));
  }
  // check username input box is exist or not
  isUserNameInputBoxPresent(): promise.Promise<boolean> {
    return this.getUserNameInputBox().isPresent();
  }


  // get password input box
  getPasswordInputBox(): ElementFinder {
    return element(by.className('form-group'));
  }
  // check password input box is exist or not
  isPasswordInputBoxPresent(): promise.Promise<boolean> {
    return this.getPasswordInputBox().isPresent();
  }

  
  // get register button
  getRegisterButton(): ElementFinder {
    return this.getregisterComponent().element(by.buttonText('Register'));
  }
  // check submit button is present or not
  isRegisterButtonPresent(): promise.Promise<boolean> {
    return this.getRegisterButton().isPresent();
  }
  // click submit button
  clickRegistertButton(): promise.Promise<void> {
    return this.getRegisterButton().click();
  }

  getRegisterInputBoxesDefaultValues(): any {
    let inputUsername;
    let inputEmail;
    let inputConfirmPassword;
    let inputPassword;
    inputUsername = this.getUserNameInputBox().getAttribute('value');
    inputEmail = this.getEmailInputBox().getAttribute('value');
    inputPassword = this.getPasswordInputBox().getAttribute('value');
    inputConfirmPassword = this.getConfirmPasswordInputBox().getAttribute('value');
    return Promise.all([inputUsername,inputEmail, inputPassword, inputConfirmPassword]).then( (values) => {
      return values;
    });
}

}