export const animationNames = {
  dropIn: {
    keyframes: `
      {
        0% {
          opacity: 0;
          transform: translateY(-50%);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `,
    cssObject: {
      animationDirection: 'normal',
      animationDuration: '1s',
      animationIterationCount: 1,
      animationName: 'dropIn',
      animationTimingFunction: 'ease-in',
    },
  },
  dropOut: {
    keyframes: `
      {
        0% {
          opacity: 1;
          transform: translateY(0%);
        }
        100% {
          opacity: 0;
          transform: translateY(50%);
        }
      }
    `,
    cssObject: {
      animationDirection: 'normal',
      animationDuration: '1s',
      animationIterationCount: 1,
      animationName: 'dropOut',
      animationTimingFunction: 'ease-in',
    },
  },
};
