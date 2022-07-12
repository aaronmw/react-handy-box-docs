import { Box } from "@/components/Box";
import {
  commonInputBoxProps,
  TextInput,
  TextInputProps,
} from "@/components/TextInput";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { useMultipleRefs } from "@/hooks/useMultipleRefs";
import { addMultipleEventListeners } from "@/utilities/addMultipleEventListeners";
import { forwardRef, Ref, useEffect, useRef } from "react";

const ElasticTextInput = forwardRef(
  (
    { ...otherProps }: Omit<TextInputProps<"textarea">, "type">,
    ref: Ref<HTMLTextAreaElement>
  ): JSX.Element => {
    const ghostElementRef = useRef<HTMLDivElement>(null);
    const textareaElementRef = useRef<HTMLTextAreaElement>(null);
    const multipleRefs = useMultipleRefs(ref, textareaElementRef);

    useKeyboardShortcuts(
      {
        enter: (event) => {
          event.preventDefault();
          (event.target as HTMLTextAreaElement).form?.dispatchEvent(
            new Event("submit", { bubbles: true })
          );
        },
      },
      textareaElementRef
    );

    useEffect(() => {
      const ghostElement = ghostElementRef.current;
      const textareaElement = textareaElementRef.current;

      if (!textareaElement || !ghostElement) {
        return;
      }

      const events = ["change", "keyup"];

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

      textareaElement.dispatchEvent(new Event("change", { bubbles: true }));

      return removeAllListeners;
    }, []);

    return (
      <Box width="100%" position="relative">
        <TextInput
          overflow="hidden"
          ref={multipleRefs}
          type="textarea"
          {...otherProps}
        />
        <Box
          as="div"
          opacity={0}
          pointerEvents="none"
          position="absolute"
          ref={ghostElementRef}
          whiteSpace="pre-wrap"
          {...commonInputBoxProps}
        />
      </Box>
    );
  }
);

ElasticTextInput.displayName = "ElasticTextInput";

export { ElasticTextInput };
