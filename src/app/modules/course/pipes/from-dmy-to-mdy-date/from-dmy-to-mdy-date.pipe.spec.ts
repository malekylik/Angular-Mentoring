import { FromDMYtoMDYDatePipe } from './from-dmy-to-mdy-date.pipe';

describe('FromDMYtoMDYDatePipe', () => {
  it('create an instance', () => {
    const pipe = new FromDMYtoMDYDatePipe();
    expect(pipe).toBeTruthy();
  });
});
