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
      animationDuration: '0.25s',
      animationIterationCount: 1,
      animationTimingFunction: 'ease-in',
    },
  },

  backdropExit: {
    keyframes: `
      from { opacity: 1; }
      to { opacity: 0; }
    `,
    style: {
      animationDirection: 'normal',
      animationDuration: '0.125s',
      animationIterationCount: 1,
      animationTimingFunction: 'ease-in',
    },
  },

  blink: {
    keyframes: `
      0%, 40% {
        opacity: 1;
      }
      60%, 100% {
        opacity: 0;
      }
    `,
    style: {
      animationDirection: 'alternate',
      animationDuration: '0.4s',
      animationIterationCount: 'infinite',
      animationTimingFunction: 'ease-in-out',
    },
  },

  dropIn: {
    keyframes: `
      0% {
        opacity: 0;
        transform: translateY(-50%);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    `,
    style: {
      animationDirection: 'normal',
      animationDuration: '1s',
      animationIterationCount: 1,
      animationTimingFunction: 'ease-in',
    },
  },

  dropOut: {
    keyframes: `
      0% {
        opacity: 1;
        transform: translateY(0%);
      }
      100% {
        opacity: 0;
        transform: translateY(50%);
      }
    `,
    style: {
      animationDirection: 'normal',
      animationDuration: '1s',
      animationIterationCount: 1,
      animationTimingFunction: 'ease-in',
    },
  },

  modalLayerEntry: {
    keyframes: `
      from { opacity: 0; }
      to { opacity: 1; }
    `,
    style: {
      animationDirection: 'normal',
      animationDuration: '0.125s',
      animationIterationCount: 1,
      animationTimingFunction: 'ease-in',
    },
  },

  modalLayerExit: {
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
      animationDuration: '0.25s',
      animationIterationCount: 1,
      animationTimingFunction: 'ease-in',
    },
  },

  modalWindowEntry: {
    keyframes: `
      from {
        filter: blur(4px);
        opacity: 0;
        transform: translate(-50%, -70%) scale(0.5);
      }
      to {
        filter: blur(0);
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }
    `,
    style: {
      animationDirection: 'normal',
      animationDuration: '0.25s',
      animationIterationCount: 1,
      animationTimingFunction: 'ease-in',
    },
  },

  modalWindowExit: {
    keyframes: `
      from {
        filter: blur(0);
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }
      to {
        filter: blur(4px);
        opacity: 0;
        transform: translate(-50%, 20%) scale(1.5);
      }
    `,
    style: {
      animationDirection: 'normal',
      animationDuration: '0.25s',
      animationIterationCount: 1,
      animationTimingFunction: 'ease-in',
    },
  },
};
