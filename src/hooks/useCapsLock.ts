import { useCallback, useState } from "react";
import type { KeyboardEvent } from "react";

export interface UseCapsLockReturn {
  isCapsLockOn: boolean;
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  onKeyUp: (event: KeyboardEvent<HTMLInputElement>) => void;
  onBlur: () => void;
}

export function useCapsLock(): UseCapsLockReturn {
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);

  const checkModifier = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
    const active = Boolean(
      typeof event.getModifierState === "function" &&
        event.getModifierState("CapsLock")
    );
    setIsCapsLockOn(active);
  }, []);

  const onBlur = useCallback(() => {
    setIsCapsLockOn(false);
  }, []);

  return {
    isCapsLockOn,
    onKeyDown: checkModifier,
    onKeyUp: checkModifier,
    onBlur,
  };
}
