import last from 'lodash/last';
import sortBy from 'lodash/sortBy';
import { forwardRef, ReactNode, useEffect, useState } from 'react';
import { Box } from '.';
import { BoxProps } from './Box.types';

type PhraseCyclerProps = Omit<BoxProps<'span'>, 'children'> & {
  /** Time in milliseconds to show each phrase; default is `2000` */
  duration?: number;
  phrases: Array<ReactNode>;
};

// eslint-disable-next-line react/display-name
const PhraseCycler = forwardRef(
  (
    { duration = 2000, phrases, ...props }: PhraseCyclerProps,
    ref: React.Ref<HTMLSpanElement>
  ) => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
      const timeout = setTimeout(() => {
        setActiveIndex((activeIndex + 1) % phrases.length);
      }, duration);

      return () => clearTimeout(timeout);
    }, [activeIndex, duration, phrases.length]);

    const longestPhrase = last(sortBy(phrases, 'length'));

    return (
      <Box
        as="span"
        display="inline-block"
        position="relative"
        ref={ref}
        whiteSpace="nowrap"
        {...props}
      >
        {/* Inflate to fit longest phrase */}
        <Box as="span" opacity={0}>
          {longestPhrase}
        </Box>

        {phrases.map((phrase, index) => {
          const isActive = activeIndex === index;

          return (
            <Box
              animationDuration="short"
              animationFillMode="forwards"
              animationName={isActive ? 'dropIn' : 'dropOut'}
              as="span"
              key={index}
              left={0}
              position="absolute"
              top={0}
            >
              {phrase}
            </Box>
          );
        })}
      </Box>
    );
  }
);

export { PhraseCycler };
