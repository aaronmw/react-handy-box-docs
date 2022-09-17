export const animationNames = {
  backdropEntry: {
    keyframes: `
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    `,
    style: {
      animationDirection: 'normal',
      animationDuration: '0.5s',
      animationIterationCount: 1,
      animationTimingFunction: 'ease-in',
    },
  },
  backdropExit: {
    keyframes: `
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    `,
    style: {
      animationDirection: 'normal',
      animationDuration: '0.5s',
      animationIterationCount: 1,
      animationTimingFunction: 'ease-in',
    },
  },
  modalWindowEntry: {
    keyframes: `
      from {
        opacity: 0;
        transform: translate(-50%, -70%);
      }
      to {
        opacity: 1;
        transform: translate(-50%, -50%);
      }
    `,
    style: {
      animationDirection: 'normal',
      animationDuration: '0.5s',
      animationIterationCount: 1,
      animationTimingFunction: 'ease-in',
    },
  },
  modalWindowExit: {
    keyframes: `
      from {
        opacity: 1;
        transform: translate(-50%, -50%);
      }
      to {
        opacity: 0;
        transform: translate(-50%, 20%);
      }
    `,
    style: {
      animationDirection: 'normal',
      animationDuration: '0.5s',
      animationIterationCount: 1,
      animationTimingFunction: 'ease-in',
    },
  },
};
