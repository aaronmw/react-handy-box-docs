import { Ref } from 'react';

export const useMultipleRefs = (...refs: Array<Ref<any>>): Ref<any> => {
  const combineRefs = (element: any) =>
    refs.forEach((ref) => {
      if (!ref) {
        return;
      }

      if (typeof ref === 'function') {
        ref(element);
      } else {
        (ref as any).current = element;
      }
    });

  return combineRefs;
};

export default useMultipleRefs;
