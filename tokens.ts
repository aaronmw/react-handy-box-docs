import { HandyTokens } from '@/react-handy-box/types';

export const tokens: HandyTokens = {
  animationDurations: {
    short: '0.125s',
    normal: '0.35s',
    long: '1s',
  },

  animations: {
    backdropEntry: {
      keyframes: `
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      `,
      defaultStyles: {
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
      defaultStyles: {
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
      defaultStyles: {
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
      defaultStyles: {
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
      defaultStyles: {
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
      defaultStyles: {
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
      defaultStyles: {
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
      defaultStyles: {
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
      defaultStyles: {
        animationDirection: 'normal',
        animationDuration: '0.25s',
        animationIterationCount: 1,
        animationTimingFunction: 'ease-in',
      },
    },
  },

  borderRadii: { small: '6px', normal: '16px', circle: '5000px' },

  borderStyles: {
    dashed: {
      borderStyle: 'dashed',
      borderWidth: '2px',
    },
    hairline: {
      borderStyle: 'solid',
      borderWidth: '1px',
    },
    none: {
      borderStyle: 'none',
      borderWidth: 0,
    },
    normal: {
      borderStyle: 'solid',
      borderWidth: '2px',
    },
    thick: {
      borderStyle: 'solid',
      borderWidth: '4px',
    },
  },

  boxShadows: {
    focusRing: `0 0 0 2px white, 0 0 0 4px primary`,
    inset: `2px 2px 0 0 shadow inset`,
    normal: `0 5px 10px 0 shadow`,
  },

  breakpoints: {
    bigDesktopOrLarger: '@media screen and (min-width: 1600px)',
    desktopOrLarger: '@media screen and (min-width: 1200px)',
    tabletOrLarger: '@media screen and (min-width: 501px)',
    phoneOrTablet: '@media screen and (max-width: 1199px)',
    tabletOnly: '@media screen and (min-width: 501px) and (max-width: 1199px)',
    phoneOnly: '@media screen and (max-width: 500px)',
    root: '@media screen',
  },

  buttonVariants: {
    base: {
      styles: {
        cursor: 'pointer',
        display: 'inline-block',
        stylesForCustomSelector: {
          ':disabled': {
            opacity: 0.6,
            pointerEvents: 'none',
          },
        },
        stylesOnFocus: {
          boxShadow: 'focusRing',
          position: 'relative',
          zIndex: '1--stickyElements',
        },
        width: 'fit-content',
        whiteSpace: 'nowrap',
      },
    },

    primary: {
      extends: ['base'],
      styles: {
        backgroundColor: 'primary',
        borderRadius: 'small',
        boxSizing: 'content-box',
        color: 'white',
        paddingX: 'tight',
        paddingY: 'xtight',
        transform: 'scale(1)',
        transitionProperty: ['transform'],
        stylesOnHover: {
          backgroundColor: 'primary',
          backgroundColorLightness: '+100',
          color: 'white',
          transform: 'scale(1.05)',
        },
      },
    },

    caution: {
      extends: ['primary'],
      styles: {
        borderColor: 'transparent',
        color: 'danger',
        stylesOnHover: {
          borderColor: 'danger',
        },
      },
    },

    danger: {
      extends: ['primary'],
      styles: {
        borderColor: 'transparent',
        color: 'danger',
        stylesOnHover: {
          borderColor: 'danger',
        },
      },
    },

    iconOnly: {
      extends: ['base'],
      styles: {
        paddingX: 'xtight',
        paddingY: 'xxtight',
        stylesOnHover: {
          color: 'primary',
        },
      },
    },

    pill: {
      extends: ['base'],
      styles: {
        alignItems: 'center',
        backgroundColor: 'selected',
        borderRadius: 'small',
        columnGap: 'xtight',
        cursor: 'pointer',
        display: 'flex',
        paddingX: 'tight',
        paddingY: 'xxtight',
        stylesOnHover: {
          backgroundColor: 'selected',
          backgroundColorLightness: '+100',
        },
      },
    },

    textLink: {
      extends: ['base'],
      styles: {
        color: 'link',
        cursor: 'pointer',
        fontWeight: 'bold',
        stylesOnHover: {
          color: 'link--hovered',
        },
        textDecoration: 'underline',
        whiteSpace: 'normal',
      },
    },
  },

  colorAliases: {
    'accent': 'orange--400',
    'background': ['white', 'purple--700'],
    'border': ['gray--200', 'purple--300--20'],
    'primary': 'purple--400',
    'codeSnippet--comment': ['gray--500', 'red--400'],
    'codeSnippet--function': ['red--500', 'gray--300'],
    'codeSnippet--keyword': ['blue--500', 'red--300'],
    'codeSnippet--numbers': ['teal--500', 'blue--300'],
    'codeSnippet--string': ['purple--500', 'teal--300'],
    'codeSnippet--tags': ['purple--600', 'purple--200'],
    'danger': ['red--400', 'purple--300'],
    'highlighted': ['yellow--300--70', 'yellow--400--20'],
    'link--hovered': 'purple--200',
    'link': 'blue--400',
    'selected': ['purple--200--40', 'purple--400'],
    'selectedText': ['purple--400', 'white'],
    'shaded': ['purple--100--40', 'purple--300--10'],
    'shadow': ['gray--400--20', 'purple--600--80'],
    'success': 'green--400',
    'text': ['blue--700', 'white'],
    'textFaded': ['gray--400', 'white--70'],
  },

  colorLightnessScale: {
    100: -0.925,
    200: -0.775,
    300: -0.6,
    400: 0,
    500: 0.33,
    600: 0.66,
    700: 0.95,
  },

  colorsCore: {
    blue: '#1599FF',
    gray: '#958F8F',
    green: '#00C980',
    orange: '#FF5C00',
    pink: '#D566DB',
    purple: '#9B00E3',
    red: '#FF002E',
    teal: '#32CCB1',
    yellow: '#FFC700',
  },

  colorsUtility: {
    'black': 'rgba(0, 0, 0, 1)',
    'transparent': 'transparent',
    'white': 'rgba(255, 255, 255, 1)',
    'white--10': 'rgba(255, 255, 255, 0.1)',
    'white--20': 'rgba(255, 255, 255, 0.2)',
    'white--30': 'rgba(255, 255, 255, 0.3)',
    'white--40': 'rgba(255, 255, 255, 0.4)',
    'white--50': 'rgba(255, 255, 255, 0.5)',
    'white--60': 'rgba(255, 255, 255, 0.6)',
    'white--70': 'rgba(255, 255, 255, 0.7)',
    'white--80': 'rgba(255, 255, 255, 0.8)',
    'white--90': 'rgba(255, 255, 255, 0.9)',
  },

  fontNames: {
    body: {
      fontFamily: `Inter, sans-serif`,
      fontWeight: 400,
    },
    display: {
      fontFamily: `Glegoo, sans-serif`,
      fontWeight: 400,
    },
  },

  fontSizesAndLineHeights: {
    phoneOnly: {
      normal: ['12px', '1.4rem'],
    },
    root: {
      xxlarge: ['3.75rem', '3.75rem'],
      xlarge: ['2.5rem', '2.5rem'],
      large: ['1.5rem', '1.5rem'],
      normal: ['16px', '1.4rem'],
      small: ['0.833rem', '1.2rem'],
      xsmall: ['0.588rem', '1rem'],
    },
  },

  globalStyles: {},

  inputStyles: {
    backgroundColor: 'background',
    border: 'normal',
    borderRadius: 'small',
    display: 'block',
    flexGrow: 1,
    flexShrink: 1,
    paddingX: 'tight',
    paddingY: 'xtight',
    stylesOnFocus: {
      boxShadow: 'focusRing',
    },
    resize: 'none',
    width: '100%',
  },

  modalBackdropStyles: {
    animationDirection: 'normal',
    animationFillMode: 'forwards',
    animationName: 'backdropEntry',
    backgroundColor: 'shadow',
  },

  modalLayerVariants: {
    dialog: {},
    menu: {
      // Extends `popover` below
      borderRadius: 'small',
      flexDirection: 'column',
      maxHeight: `calc(100vh - normal * 2)`,
      maxWidth: `calc(100vw - normal * 2)`,
      minWidth: 150,
      overflowY: 'auto',
      padding: 'xtight',
      transitionDuration: 'short',
      transitionProperty: 'opacity',
    },
    popover: {
      backgroundColor: 'background',
      border: 'normal',
      borderRadius: 'normal',
      boxShadow: 'normal',
      padding: 'tight',
    },
    tooltip: {
      backgroundColor: 'text',
      border: undefined,
      borderRadius: 'small',
      color: 'background',
      maxWidth: '20vw',
      paddingX: 'tight',
      paddingY: 'xtight',
    },
    window: {
      animationName: 'modalWindowEntry',
      backgroundColor: 'background',
      border: 'normal',
      borderRadius: 'normal',
      boxShadow: 'normal',
      display: 'flex',
      left: '50%',
      maxHeight: `calc(100vh - normal * 2)`,
      maxWidth: `calc(100vw - normal * 2)`,
      opacity: 0,
      position: 'fixed',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      transitionProperty: ['margin-left', 'margin-top', 'opacity', 'transform'],
    },
  },

  scrollbarStyles: {
    height: 10,
    width: 10,
  },

  scrollbarCornerStyles: {
    backgroundColor: 'shaded',
  },

  scrollbarThumbStyles: {
    backgroundColor: 'primary',
    border: 'hairline',
    borderColor: 'background',
    borderRadius: 'circle',
  },

  scrollbarTrackStyles: { backgroundColor: 'shaded' },

  textVariants: {
    'code': {
      as: 'code',
      styles: { color: 'primary', fontFamily: 'monospace' },
    },
    'heading--1': {
      as: 'h1',
      styles: { fontSize: 'xxlarge', fontWeight: 900 },
    },
    'heading--2': {
      as: 'h2',
      styles: { fontSize: 'xlarge', fontWeight: 'bold' },
    },
    'heading--3': {
      as: 'h3',
      styles: { fontSize: 'large', fontWeight: 'bold' },
    },
    'label': {
      styles: { color: 'textFaded', fontSize: 'small' },
    },
  },

  whitespaces: {
    phoneOnly: {
      normal: '1rem',
    },
    root: {
      xxloose: '15vh',
      xloose: '5rem',
      loose: '3rem',
      normal: '2rem',
      tight: '1rem',
      xtight: '0.5rem',
      xxtight: '0.25rem',
    },
  },

  zIndices: {
    '1000--maximum': 1000,
    '100--popoversAndTooltips': 100,
    '10--modalWindows': 10,
    '1--stickyElements': 1,
  },
};
