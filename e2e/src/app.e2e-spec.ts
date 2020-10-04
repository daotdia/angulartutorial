import { browser } from 'protractor';
import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display message Ristorante Confusion', () => {
    page.navigateTo('/');
    expect(page.getParagraphText('app-root h1')).toEqual('Welcome to conFusion!');
  });

  it('should navigate about us page by clicking on the link', () => {
    page.navigateTo('/');
    let navlink = page.getAllElements('a').get(1);
    navlink.click();
    expect(page.getParagraphText('h3')).toBe('About Us');
  });

  it('should enter a new comment for the first dish', () => {
    page.navigateTo('/dishdetail/0');
    
    const newauthor = page.getElement('input[type=text]');
    newauthor.sendKeys('Test Author');

    const newComment = page.getElement('textarea');
    newComment.sendKeys('Test Comment');

    const newSubmitButton = page.getElement('button[type=submit]');
    newSubmitButton.click();

    browser.pause();
  });
});
