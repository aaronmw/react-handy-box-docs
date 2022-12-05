import { TokensByBreakpoint } from '@/react-handy-box/components/Box.types';

export const whiteSpaceNames = [
  'xxloose',
  'xloose',
  'loose',
  'normal',
  'tight',
  'xtight',
  'xxtight',
] as const;

export const whiteSpaceByBreakpoint: TokensByBreakpoint<
  string,
  typeof whiteSpaceNames[number]
> = {
  root: {
    xxloose: '15vh',
    xloose: '5rem',
    loose: '3rem',
    normal: '2rem',
    tight: '1rem',
    xtight: '0.5rem',
    xxtight: '0.25rem',
  },
};
