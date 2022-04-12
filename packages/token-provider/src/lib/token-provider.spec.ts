import { tokenProvider } from './token-provider';

describe('tokenProvider', () => {
  it('should work', () => {
    expect(tokenProvider()).toEqual('token-provider');
  });
});
