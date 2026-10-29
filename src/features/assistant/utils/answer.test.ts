import { answerQuestion, SUGGESTIONS } from './answer';

describe('answerQuestion', () => {
  it('links each suggested question to the right guide or page', () => {
    expect(SUGGESTIONS.map((q) => answerQuestion(q).action?.href)).toEqual([
      '/guides/griha',
      '/guides/lakshmi',
      '/festival/diwali',
      '/guides/daily',
    ]);
  });

  it('understands Hindi keywords', () => {
    expect(answerQuestion('छठ पूजा कैसे करें').action?.href).toBe('/festival/chhath');
  });

  it('declines health, money and legal questions without a link', () => {
    const answer = answerQuestion('Which medicine should I take?');
    expect(answer.text).toContain('can’t advise');
    expect(answer.action).toBeUndefined();
  });

  it('falls back to a general reply', () => {
    expect(answerQuestion('hello').text).toContain('Which festival or ritual');
  });
});
