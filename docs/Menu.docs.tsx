import { Button } from "@/components/Button";
import { Menu } from "@/components/Menu";
import { useModalWindow } from "@/hooks/useModalWindow";
import range from "lodash/range";
import { DocumentationPageDescriptor } from "../pages";

const docs: DocumentationPageDescriptor = {
  title: "Menu",
  demos: [
    {
      title: "Single-Level",
      renderDemo: () => (
        <Menu
          options={[
            {
              icon: "pencil",
              label: "Edit",
              type: "menu-item",
              onClick: () => console.log(`Clicked "Edit"`),
            },
            {
              icon: "floppy-disk",
              label: "Save",
              type: "menu-item",
              onClick: () => console.log(`Clicked "Save"`),
            },
          ]}
          renderTrigger={({ propsForTrigger }) => (
            <Button {...propsForTrigger}>Open Menu</Button>
          )}
        />
      ),
      renderSnippet: () => `
        <Menu
          options={[
            {
              icon: "pencil",
              label: "Edit",
              type: "menu-item",
              onClick: () => console.log(\`Clicked "Edit"\`),
            },
            {
              icon: "floppy-disk",
              label: "Save",
              type: "menu-item",
              onClick: () => console.log(\`Clicked "Save"\`),
            },
          ]}
          renderTrigger={({ propsForTrigger }) => (
            <Button {...propsForTrigger}>
              Open Menu
            </Button>
          )}
        />
      `,
    },

    {
      title: "Multi-Level",
      renderDemo: () => (
        <Menu
          options={[
            {
              icon: "pencil",
              label: "Edit",
              type: "menu-item",
              onClick: () => console.log(`Clicked "Edit"`),
            },
            {
              icon: "floppy-disk",
              label: "Save",
              type: "menu-item",
              onClick: () => console.log(`Clicked "Save"`),
            },
            {
              label: "More actions...",
              type: "child-menu",
              options: [
                {
                  icon: "trash",
                  label: "Delete",
                  type: "menu-item",
                  onClick: () =>
                    console.log(`Clicked "More actions... -> Delete"`),
                },
              ],
            },
          ]}
          renderTrigger={({ propsForTrigger }) => (
            <Button {...propsForTrigger}>Open Menu</Button>
          )}
        />
      ),
      renderSnippet: () => `
        <Menu
          options={[
            {
              icon: "pencil",
              label: "Edit",
              type: "menu-item",
              onClick: () => console.log(\`Clicked "Edit"\`),
            },
            {
              icon: "floppy-disk",
              label: "Save",
              type: "menu-item",
              onClick: () => console.log(\`Clicked "Save"\`),
            },
            {
              label: "More actions...",
              type: "child-menu",
              options: [
                {
                  icon: "trash",
                  label: "Delete",
                  type: "menu-item",
                  onClick: () =>
                    console.log(
                      \`Clicked "More actions... -> Delete"\`
                    ),
                },
              ],
            },
          ]}
          renderTrigger={({ propsForTrigger }) => (
            <Button {...propsForTrigger}>
              Open Menu
            </Button>
          )}
        />
      `,
      highlightLines: range(15, 30),
    },

    {
      title: "Item Groups",
      renderDemo: () => (
        <Menu
          options={[
            {
              label: "Safe Actions",
              type: "group-label",
            },
            {
              icon: "pencil",
              label: "Edit",
              type: "menu-item",
              onClick: () => console.log(`Clicked "Edit"`),
            },
            {
              icon: "floppy-disk",
              label: "Save",
              type: "menu-item",
              onClick: () => console.log(`Clicked "Save"`),
            },
            {
              label: "Dangerous Actions",
              type: "group-label",
            },
            {
              icon: "trash",
              label: "Delete",
              type: "menu-item",
              onClick: () => console.log(`Clicked "Delete"`),
            },
          ]}
          renderTrigger={({ propsForTrigger }) => (
            <Button {...propsForTrigger}>Open Menu</Button>
          )}
        />
      ),
      renderSnippet: () => `
        <Menu
          options={[
            {
              label: "Safe Actions",
              type: "group-label",
            },
            {
              icon: "pencil",
              label: "Edit",
              type: "menu-item",
              onClick: () => console.log(\`Clicked "Edit"\`),
            },
            {
              icon: "floppy-disk",
              label: "Save",
              type: "menu-item",
              onClick: () => console.log(\`Clicked "Save"\`),
            },
            {
              label: "Dangerous Actions",
              type: "group-label",
            },
            {
              icon: "trash",
              label: "Delete",
              type: "menu-item",
              onClick: () => console.log(\`Clicked "Delete"\`),
            },
          ]}
          renderTrigger={({ propsForTrigger }) => (
            <Button {...propsForTrigger}>
              Open Menu
            </Button>
          )}
        />
      `,
      highlightLines: [...range(3, 7), ...range(19, 23)],
    },

    {
      title: "Dividing Lines",
      renderDemo: () => (
        <Menu
          options={[
            {
              icon: "pencil",
              label: "Edit",
              type: "menu-item",
              onClick: () => console.log(`Clicked "Edit"`),
            },
            {
              icon: "floppy-disk",
              label: "Save",
              type: "menu-item",
              onClick: () => console.log(`Clicked "Save"`),
            },
            {
              type: "dividing-line",
            },
            {
              icon: "trash",
              label: "Delete",
              type: "menu-item",
              onClick: () => console.log(`Clicked "Delete"`),
            },
          ]}
          renderTrigger={({ propsForTrigger }) => (
            <Button {...propsForTrigger}>Open Menu</Button>
          )}
        />
      ),
      renderSnippet: () => `
        <Menu
          options={[
            {
              icon: "pencil",
              label: "Edit",
              type: "menu-item",
              onClick: () => console.log(\`Clicked "Edit"\`),
            },
            {
              icon: "floppy-disk",
              label: "Save",
              type: "menu-item",
              onClick: () => console.log(\`Clicked "Save"\`),
            },
            {
              type: "dividing-line",
            },
            {
              icon: "trash",
              label: "Delete",
              type: "menu-item",
              onClick: () => console.log(\`Clicked "Delete"\`),
            },
          ]}
          renderTrigger={({ propsForTrigger }) => (
            <Button {...propsForTrigger}>Open Menu</Button>
          )}
        />
      `,
      highlightLines: [...range(15, 18)],
    },

    {
      title: "Triggering Modals",
      renderDemo: () => <ModalLaunchingMenuDemo />,
      renderSnippet: () => `
        const ModalLaunchingMenuDemo = () => {
          const {
            ModalWindow,
            setIsModalWindowOpen,
          } = useModalWindow();

          return (
            <>
              <Menu
                options={[
                  {
                    icon: "up-right-from-square",
                    label: "Launch a Modal...",
                    type: "menu-item",
                    onClick: () => {
                      console.log(\`Opening modal...\`);
                      setIsModalWindowOpen(true);
                    },
                  },
                ]}
                renderTrigger={({ propsForTrigger }) => (
                  <Button {...propsForTrigger}>
                    Open Menu
                  </Button>
                )}
              />
              <ModalWindow>
                I am remote-controlled!
              </ModalWindow>
            </>
          );
        };
      `,
      highlightLines: [...range(2, 6), ...range(15, 19)],
    },
  ],
};

const ModalLaunchingMenuDemo = () => {
  const { ModalWindow, setIsModalWindowOpen } = useModalWindow();

  return (
    <>
      <Menu
        options={[
          {
            icon: "up-right-from-square",
            label: "Launch a Modal...",
            type: "menu-item",
            onClick: () => {
              console.log(`Opening modal...`);
              setIsModalWindowOpen(true);
            },
          },
        ]}
        renderTrigger={({ propsForTrigger }) => (
          <Button {...propsForTrigger}>Open Menu</Button>
        )}
      />
      <ModalWindow>I am remote-controlled!</ModalWindow>
    </>
  );
};

export default docs;
