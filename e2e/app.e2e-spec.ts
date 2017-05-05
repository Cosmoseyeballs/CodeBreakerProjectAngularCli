import { CodeBreakerProjectAngularCliPage } from './app.po';

describe('code-breaker-project-angular-cli App', () => {
  let page: CodeBreakerProjectAngularCliPage;

  beforeEach(() => {
    page = new CodeBreakerProjectAngularCliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
