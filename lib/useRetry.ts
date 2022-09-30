import { useEffect, useRef, useState } from 'react';

// FIXME: こんなのなくてもいけると思うんだけど...
export const useRetry = <T extends (args: any) => Promise<any>>(
  action: T,
  isNoAction: boolean
) => {
  const [retrying, setRetrying] = useState(false);
  const callback = useRef(action);

  useEffect(() => {
    if (isNoAction) return;
    if (retrying === true) return;

    callback.current({}).then(() => {
      setTimeout(() => {
        setRetrying(false);
      }, 2000);
    });
    setRetrying(true);
  }, [isNoAction, retrying, setRetrying]);

  return {
    retrying,
  };
};
