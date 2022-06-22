import { Box } from '@/components/Box';
import { BoxProps } from '@/components/Box.types';
import clamp from 'lodash/clamp';
import { forwardRef, ReactNode, Ref, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useMultipleRefs } from '../hooks';

const variantPropMap = {
  normal: {
    backgroundColor: 'text',
    borderRadius: 'small',
    color: 'white',
    paddingX: 'tight',
    paddingY: 'xtight',
  },
} as const;

type TooltipProps = Omit<BoxProps<'div'>, 'content'> & {
  content: ReactNode;
  disabled?: boolean;
  variant?: keyof typeof variantPropMap;
};

const Tooltip = forwardRef(
  (
    {
      children,
      content,
      disabled = false,
      variant = 'normal',
      ...props
    }: TooltipProps,
    ref: Ref<HTMLDivElement>
  ) => {
    const targetElementRef = useRef<HTMLDivElement>(null);
    const tooltipElementRef = useRef<HTMLDivElement>(null);
    const multipleRefs = useMultipleRefs(ref, targetElementRef);
    const [isShowingTooltip, setIsShowingTooltip] = useState(false);

    useEffect(() => {
      const targetElement = targetElementRef.current;
      const tooltipElement = tooltipElementRef.current;

      if (disabled || !targetElement || !tooltipElement) {
        return;
      }

      const showTooltip = () => {
        const targetElementRect = targetElement.getBoundingClientRect();
        const tooltipElementHeight = tooltipElement.offsetHeight;
        const tooltipElementWidth = tooltipElement.offsetWidth;
        const targetLeft = targetElementRect.x + targetElementRect.width / 2;
        const targetTop = targetElementRect.y - tooltipElementHeight;

        const clampedLeft = clamp(
          targetLeft,
          10,
          window.innerWidth - tooltipElementWidth / 2 - 10
        );
        const clampedTop = clamp(
          targetTop,
          10,
          window.innerHeight - tooltipElementHeight / 2 - 10
        );

        tooltipElement.style.left = `${clampedLeft}px`;
        tooltipElement.style.top = `${clampedTop}px`;

        setIsShowingTooltip(true);
      };

      const hideTooltip = () => {
        setIsShowingTooltip(false);
      };

      targetElement.addEventListener('mouseenter', showTooltip);
      targetElement.addEventListener('mouseleave', hideTooltip);

      return () => {
        targetElement.removeEventListener('mouseenter', showTooltip);
        targetElement.removeEventListener('mouseleave', hideTooltip);
      };
    }, [disabled]);

    return (
      <>
        <Box ref={multipleRefs} {...props}>
          {children}
        </Box>
        {createPortal(
          <Box
            boxShadow="normal"
            marginTop="calc(var(--whiteSpace--xtight) * -1)"
            opacity={isShowingTooltip ? 1 : 0}
            pointerEvents={isShowingTooltip ? 'all' : 'none'}
            position="fixed"
            ref={tooltipElementRef}
            transform="translateX(-50%)"
            transitionDelay={isShowingTooltip ? '0.3s' : '0'}
            transitionProperty="opacity"
            whiteSpace="nowrap"
            zIndex="5000"
            {...variantPropMap[variant]}
          >
            {content}
          </Box>,
          document.body
        )}
      </>
    );
  }
);

export { Tooltip };
