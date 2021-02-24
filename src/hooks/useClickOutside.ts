import { useEffect, useCallback, RefObject } from "react";

type RefType = RefObject<any> | RefObject<any>[]

const isRefArray = (r: RefType): r is RefObject<any>[] => "length" in r

const isTarget = (ref: RefObject<any>, event: MouseEvent) => {
  return ref && ref.current && ref.current.contains(event.target)
}

const trueForAny = (array: any[], condition: (props: any) => boolean) => {
  return array.reduce((conditionAlreadyMet, value) => {
    return conditionAlreadyMet || condition(value)
  }, false)
}

const useClickOutside = (ref: RefType, onclick: () => void) => {
  const handleClick = useCallback((click: MouseEvent) => {
    if (!isRefArray(ref)) {
      if (isTarget(ref, click)) return
    }
    else if (trueForAny(ref as RefObject<any>[], (ref: RefObject<any>) => isTarget(ref, click))) return

    onclick()
  }, [onclick, ref])

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [handleClick]);

  return ref;
}

export default useClickOutside;
