import { Box } from '@/react-handy-box/components/Box';
import { BoxProps } from '@/react-handy-box/components/Box.types';
import { useDOMWatcher } from '@/react-handy-box/hooks/useDOMWatcher';
import { useMultipleRefs } from '@/react-handy-box/hooks/useMultipleRefs';
import { forwardRef, ReactNode, Ref, useEffect, useRef, useState } from 'react';

const OverflowIndicator = (props: BoxProps) => (
  <Box
    height={10}
    left={0}
    marginTop={-10}
    overflow="hidden"
    pointerEvents="none"
    position="sticky"
    right={0}
    transitionProperty="opacity"
    zIndex="1--stickyElements"
    {...props}
  >
    <Box
      borderRadius="100%"
      boxShadow="normal"
      height={10}
      transform="translateY(-100%)"
      width="100%"
    />
  </Box>
);

type ScrollableBoxProps<TagName extends keyof JSX.IntrinsicElements = 'div'> =
  Omit<BoxProps<TagName>, 'children' | 'ref'> & {
    children: ReactNode;
    offsetBottomOverflowIndicator?: number;
    offsetTopOverflowIndicator?: number;
  };

const ScrollableBox = forwardRef(
  <TagName extends keyof JSX.IntrinsicElements = 'div'>(
    {
      children,
      height,
      maxHeight,
      offsetBottomOverflowIndicator,
      offsetTopOverflowIndicator,
      ...otherProps
    }: ScrollableBoxProps<TagName>,
    outerRef: Ref<HTMLElement>
  ) => {
    const { addDOMWatcher, removeDOMWatcher } = useDOMWatcher();
    const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
    const [isScrolledToTop, setIsScrolledToTop] = useState(false);
    const [isOverflowing, setIsOverflowing] = useState(false);
    const scrollingElementRef = useRef<HTMLElement>(null);
    const multipleRefs = useMultipleRefs(outerRef, scrollingElementRef);

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
        height={height}
        maxHeight={maxHeight}
        overflow={isOverflowing ? 'auto' : undefined}
        position="relative"
        ref={multipleRefs}
        {...(otherProps as any)}
      >
        <OverflowIndicator
          opacity={isScrolledToTop ? 0 : 1}
          top={offsetTopOverflowIndicator ?? 0}
        />
        {children}
        <OverflowIndicator
          bottom={offsetBottomOverflowIndicator ?? 0}
          opacity={isScrolledToBottom ? 0 : 1}
          transform="rotate(180deg)"
        />
      </Box>
    );
  }
);

ScrollableBox.displayName = 'ScrollableBox';

export { ScrollableBox };
