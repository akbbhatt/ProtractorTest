import { browser, By, element, ExpectedConditions } from 'protractor';

var existingUserEmail = 'gk123@gk.com';
var existingUserPassword = '123456';

beforeEach(() => {
  browser.get(`http://automationpractice.com/index.php`);
});

describe('Sign Up', () => {
  it('Create a new user and sign up', async () => {
    let firstName = 'Firstname';
    let lastName = 'Lastname';
    browser.until(ExpectedConditions.visibilityOf(element(By.className('login')))).click();
    browser.findElement(By.id('email_create')).sendKeys(`testuser@gfk.testemail.com`);
    browser.findElement(By.id('SubmitCreate')).click();
    browser.findElement(By.id('passwd')).sendKeys('Qwerty');

    browser.findElement(By.id('company')).sendKeys('Company');
    browser.findElement(By.id('address1')).sendKeys('Qwerty, 123');
    browser.findElement(By.id('address2')).sendKeys('zxcvb');
    browser.findElement(By.id('city')).sendKeys('Qwerty');

    browser.findElement(By.id('postcode')).sendKeys('12345');
    browser.findElement(By.id('other')).sendKeys('Qwerty');
    browser.findElement(By.id('phone')).sendKeys('12345123123');
    browser.findElement(By.id('phone_mobile')).sendKeys('12345123123');
    browser.findElement(By.id('alias')).sendKeys('gk');
    browser.findElement(By.id('submitAccount')).click();

    expect(browser.findElement(By.className('account')).getText()).toContain(firstName + ' ' + lastName);
    expect(browser.findElement(By.className('info-account')).getText()).toContain('Welcome to your account.');
    expect(browser.findElement(By.className('logout')).isDisplayed()).toBeTruthy();
    expect(browser.getCurrentUrl()).toContain('controller=my-account');
  });
});

describe('Sign In', () => {
  it('Already existing user signs in', async () => {
    let fullName = 'John Brown';
    browser.until(ExpectedConditions.visibilityOf(element(By.className('login')))).click();
    browser.findElement(By.id('email')).sendKeys(existingUserEmail);
    browser.findElement(By.id('passwd')).sendKeys(existingUserPassword);
    browser.findElement(By.id('SubmitLogin')).click();
    let heading = browser.until(ExpectedConditions.visibilityOf(element(By.cssSelector('h1'))));

    expect('MY ACCOUNT').toContain(heading.getText());
    expect(fullName).toEqual(browser.findElement(By.className('account')).getText());
    expect(browser.findElement(By.className('info-account')).getText()).toContain('Welcome to your account.');
    expect(browser.findElement(By.className('logout')).isDisplayed());
    expect(browser.getCurrentUrl()).toContain('controller=my-account');
  });
});

describe('Checkout', () => {
  it('select and check out items', async () => {
    browser.until(ExpectedConditions.visibilityOf(element(By.className('login')))).click();
    browser.findElement(By.id('email')).sendKeys(existingUserEmail);
    browser.findElement(By.id('passwd')).sendKeys(existingUserPassword);
    browser.findElement(By.id('SubmitLogin')).click();
    browser.until(ExpectedConditions.visibilityOf(element(By.linkText('Women')))).click();
    browser.findElement(By.xpath("//a[@title='Faded Short Sleeve T-shirts']/ancestor::li")).click();
    browser.findElement(By.xpath("//a[@title='Faded Short Sleeve T-shirts']/ancestor::li")).click();
    browser.until(ExpectedConditions.visibilityOf(element(By.name('Submit')))).click();
    browser.until(ExpectedConditions.visibilityOf(element(By.xpath("//*[@id='layer_cart']//a[@class and @title='Proceed to checkout']")))).click();
    browser
      .until(ExpectedConditions.visibilityOf(element(By.xpath("//*[contains(@class,'cart_navigation')]/a[@title='Proceed to checkout']"))))
      .click();
    browser.until(ExpectedConditions.visibilityOf(element(By.name('processAddress')))).click();
    browser.until(ExpectedConditions.visibilityOf(element(By.id('uniform-cgv')))).click();
    browser.findElement(By.name('processCarrier')).click();
    browser.until(ExpectedConditions.visibilityOf(element(By.className('bankwire')))).click();
    browser.until(ExpectedConditions.visibilityOf(element(By.xpath(`//*[@id='cart_navigation']/button`)))).click();
    let heading = browser.until(ExpectedConditions.visibilityOf(By.cssSelector('h1')));

    expect('ORDER CONFIRMATION').toContain(heading.getText());
    expect(browser.findElement(By.xpath("//li[@class='step_done step_done_last four']")).isDisplayed()).toBeTruthy();
    expect(browser.findElement(By.xpath("//li[@id='step_end' and @class='step_current last']")).isDisplayed()).toBeTruthy();
    expect(browser.findElement(By.xpath(`//*[@class='cheque-indent']/strong`)).getText()).toContain('Your order on My Store is complete.');
    expect(browser.getCurrentUrl()).toContain('controller=order-confirmation');
  });
});
