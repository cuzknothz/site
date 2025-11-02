import { useEffect, useRef } from 'react';

const config: MutationObserverInit = {
  //  attributes: true,
  childList: true,
  subtree: true,
};

export const useMutationObserver = (
  targetNode: Node,
  callBackFn: () => void,
): void => {
  const observer = useRef<MutationObserver | null>(null);

  // Định nghĩa kiểu cho callback MutationObserver
  const callback: MutationCallback = (mutationList, observer) => {
    for (const mutation of mutationList) {
      if (mutation.type === 'childList') {
        callBackFn();
      } else if (mutation.type === 'attributes') {
      }
    }
  };

  useEffect(() => {
    if (!targetNode) return;
    observer.current = new MutationObserver(callback);

    observer.current.observe(targetNode, config);
    return () => {
      observer.current?.disconnect();
    };
    // Nếu targetNode hoặc callBackFn thay đổi thì re-init observer
  }, [targetNode, callBackFn]);
};
