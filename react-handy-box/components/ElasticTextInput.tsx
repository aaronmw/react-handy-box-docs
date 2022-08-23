import { Box } from '@/react-handy-box/components/Box';
import {
  TextInput,
  TextInputProps,
} from '@/react-handy-box/components/TextInput';
import { useKeyboardShortcuts } from '@/react-handy-box/hooks/useKeyboardShortcuts';
import { useMultipleRefs } from '@/react-handy-box/hooks/useMultipleRefs';
import { addMultipleEventListeners } from '@/react-handy-box/utilities/addMultipleEventListeners';
import { inputStyles } from '@/tokens/inputStyles';
import { forwardRef, Ref, useEffect, useRef } from 'react';

const ElasticTextInput = forwardRef(
  (
    { styles, ...otherProps }: Omit<TextInputProps<'textarea'>, 'type'>,
    ref: Ref<HTMLLabelElement>
  ): JSX.Element => {
    const ghostElementRef = useRef<HTMLDivElement>(null);
    const labelElementRef = useRef<HTMLLabelElement>(null);
    const multipleRefs = useMultipleRefs(ref, labelElementRef);

    useKeyboardShortcuts(
      {
        enter: (event) => {
          event.preventDefault();
          (event.target as HTMLTextAreaElement).form?.dispatchEvent(
            new Event('submit', { bubbles: true })
          );
        },
      },
      labelElementRef
    );

    useEffect(() => {
      const ghostElement = ghostElementRef.current;
      const textareaElement = labelElementRef.current;

      if (!textareaElement || !ghostElement) {
        return;
      }

      const events = ['change', 'keyup'];

      const resizeTextareaElement: EventListener = (event) => {
        const typedText = (event.target as HTMLTextAreaElement).value;

        ghostElement.innerText = `${typedText}.`;

        const { width: ghostElementWidth, height: ghostElementHeight } =
          ghostElement.getBoundingClientRect();

        textareaElement.style.width = `${Math.round(ghostElementWidth)}px`;
        textareaElement.style.height = `${Math.round(ghostElementHeight)}px`;
      };

      const removeAllListeners = addMultipleEventListeners(
        textareaElement,
        events,
        resizeTextareaElement
      );

      textareaElement.dispatchEvent(new Event('change', { bubbles: true }));

      return removeAllListeners;
    }, []);

    return (
      <Box
        styles={{
          position: 'relative',
          width: '100%',
        }}
      >
        <TextInput
          ref={multipleRefs as any}
          styles={{
            overflow: 'hidden',
            ...styles,
          }}
          type="textarea"
          {...otherProps}
        />
        <Box
          as="div"
          ref={ghostElementRef}
          styles={{
            ...inputStyles,
            opacity: 0,
            pointerEvents: 'none',
            position: 'absolute',
            whiteSpace: 'pre-wrap',
          }}
        />
      </Box>
    );
  }
);

ElasticTextInput.displayName = 'ElasticTextInput';

export { ElasticTextInput };
