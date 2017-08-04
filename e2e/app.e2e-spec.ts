import { ProfessorsUiPage } from './app.po';

describe('professors-ui App', () => {
  let page: ProfessorsUiPage;

  beforeEach(() => {
    page = new ProfessorsUiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
