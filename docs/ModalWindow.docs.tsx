import { DocumentationPageDescriptor } from '@/pages/index';
import { Button } from '@/react-handy-box/components/Button';
import { ModalWindow } from '@/react-handy-box/components/ModalWindow';
import range from 'lodash/range';
import { useState } from 'react';

const ManualModalWindowDemo = () => {
  const [isModalWindowOpen, setIsModalWindowOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsModalWindowOpen(true)}>Open a Modal</Button>
      <ModalWindow
        isOpen={isModalWindowOpen}
        onClose={() => setIsModalWindowOpen(false)}
      >
        I am a modal window.
      </ModalWindow>
    </>
  );
};

const docs: DocumentationPageDescriptor = {
  title: 'ModalWindow',
  demos: [
    {
      title: 'Trigger Controlled',
      renderDemo: () => (
        <ModalWindow
          renderTrigger={({ propsForTrigger }) => (
            <Button {...propsForTrigger}>Open a Modal</Button>
          )}
        >
          I am a modal window.
        </ModalWindow>
      ),
      renderSnippet: () => `
        <ModalWindow
          renderTrigger={({ propsForTrigger }) => (
            <Button {...propsForTrigger}>
              Open a Modal
            </Button>
          )}
        >
          I am a modal window.
        </ModalWindow>
      `,
    },
    {
      title: 'Manually Controlled',
      renderDemo: () => <ManualModalWindowDemo />,
      renderSnippet: () => `
        const ModalWindowDemo = () => {
          const [
            isModalWindowOpen,
            setIsModalWindowOpen,
          ] = useState(false);

          return (
            <>
              <Button onClick={
                setIsModalWindowOpen.bind(null, true)}
              >
                Open a Modal
              </Button>
              <ModalWindow
                isOpen={isModalWindowOpen}
                onClose={
                  setIsModalWindowOpen.bind(null, false)
                }
              >
                I am a modal window.
              </ModalWindow>
            </>
          );
        };
      `,
      highlightLines: [...range(2, 6), ...range(9, 12), ...range(16, 19)],
    },
  ],
};

export default docs;
