import { AngularNotificationsPage } from './app.po';

describe('angular-notifications App', () => {
  let page: AngularNotificationsPage;

  beforeEach(() => {
    page = new AngularNotificationsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
