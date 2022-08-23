import { Box } from '@/react-handy-box/components/Box';
import { BoxProps } from '@/react-handy-box/components/Box.types';
import { useDOMWatcher } from '@/react-handy-box/hooks/useDOMWatcher';
import { useMultipleRefs } from '@/react-handy-box/hooks/useMultipleRefs';
import { forwardRef, ReactNode, Ref, useEffect, useRef, useState } from 'react';

const OverflowIndicator = forwardRef(
  ({ styles, ...otherProps }: BoxProps, ref: Ref<HTMLDivElement>) => (
    <Box
      ref={ref}
      styles={{
        height: 10,
        left: 0,
        marginTop: -10,
        overflow: 'hidden',
        pointerEvents: 'none',
        position: 'sticky',
        right: 0,
        transitionProperty: 'opacity',
        zIndex: '1--stickyElements',
        ...styles,
      }}
      {...otherProps}
    >
      <Box
        styles={{
          borderRadius: '100%',
          boxShadow: 'normal',
          height: 10,
          transform: 'translateY(-100%)',
          width: '100%',
        }}
      />
    </Box>
  )
);

OverflowIndicator.displayName = 'OverflowIndicator';

type ScrollableBoxProps<TagName extends keyof JSX.IntrinsicElements = 'div'> =
  Omit<BoxProps<TagName>, 'children'> & {
    children: ReactNode;
    offsetBottomOverflowIndicator?: number;
    offsetTopOverflowIndicator?: number;
  };

const ScrollableBox = forwardRef(
  <TagName extends keyof JSX.IntrinsicElements = 'div'>(
    {
      children,
      offsetBottomOverflowIndicator,
      offsetTopOverflowIndicator,
      styles,
      ...otherProps
    }: ScrollableBoxProps<TagName>,
    ref: Ref<HTMLDivElement>
  ) => {
    const { addDOMWatcher, removeDOMWatcher } = useDOMWatcher();
    const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
    const [isScrolledToTop, setIsScrolledToTop] = useState(false);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const scrollingElementRef = useRef<HTMLElement>(null);
    const multipleRefs = useMultipleRefs(ref, scrollingElementRef);

    useEffect(() => {
      const scrollingElement = scrollingElementRef.current;

      if (scrollingElement) {
        const updateScrollInfo = () => {
          const originalOverflow = scrollingElement.style.overflow;

          scrollingElement.style.overflow = 'auto';

          const elementHeight = scrollingElement.clientHeight;
          const scrollHeight = scrollingElement.scrollHeight;
          const scrollTop = scrollingElement.scrollTop;
          const newIsOverflowing = scrollHeight > elementHeight;
          const scrollProgress =
            ((scrollTop + elementHeight) / scrollHeight) * 100;
          const newIsScrolledToBottom = scrollProgress >= 99;
          const newIsScrolledToTop = scrollTop === 0;

          scrollingElement.style.overflow = originalOverflow;

          if (newIsScrolledToBottom !== isScrolledToBottom) {
            setIsScrolledToBottom(newIsScrolledToBottom);
          }

          if (newIsScrolledToTop !== isScrolledToTop) {
            setIsScrolledToTop(newIsScrolledToTop);
          }

          if (newIsOverflowing !== isOverflowing) {
            setIsOverflowing(newIsOverflowing);
          }
        };

        updateScrollInfo();

        scrollingElement.addEventListener('scroll', updateScrollInfo);
        scrollingElement.addEventListener('transitionend', updateScrollInfo);

        addDOMWatcher(updateScrollInfo);

        return () => {
          scrollingElement.removeEventListener('scroll', updateScrollInfo);
          scrollingElement.removeEventListener(
            'transitionend',
            updateScrollInfo
          );
          removeDOMWatcher(updateScrollInfo);
        };
      }
    });

    return (
      <Box
        ref={multipleRefs}
        styles={{
          overflow: isOverflowing ? 'auto' : undefined,
          position: 'relative',
          ...styles,
        }}
        {...(otherProps as any)}
      >
        <OverflowIndicator
          styles={{
            opacity: isScrolledToTop ? 0 : 1,
            top: offsetTopOverflowIndicator ?? 0,
          }}
        />

        {children}

        <OverflowIndicator
          styles={{
            bottom: offsetBottomOverflowIndicator ?? 0,
            opacity: isScrolledToBottom ? 0 : 1,
            transform: 'rotate(180deg)',
          }}
        />
      </Box>
    );
  }
);

ScrollableBox.displayName = 'ScrollableBox';

export { ScrollableBox };
