import { DurationPipe } from './duration.pipe';

describe('DurationPipePipe', () => {
  const pipe = new DurationPipe();

  it('create an instance', () => {
    const pipe = new DurationPipe();
    expect(pipe).toBeTruthy();
  });

  it('tranform 0 to 0', () => {
    expect(pipe.transform(0)).toBe('0min');
  });

  it('tranform 42 to 42min', () => {
    expect(pipe.transform(42)).toBe('42min');
  });

  it('tranform 60 to 1h 0min', () => {
    expect(pipe.transform(60)).toBe('1h 0min');
  });

  it('tranform 102 to 1h 42min', () => {
    expect(pipe.transform(102)).toBe('1h 42min');
  });
});
