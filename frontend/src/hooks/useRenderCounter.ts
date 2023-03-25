import { useEffect, useRef } from "react";

function useRenderCounter(initialValue: number): React.MutableRefObject<number> {
    const count = useRef<number>(initialValue);
    useEffect(() => {
        count.current = count.current + 1;
    });
    return count;
}

export default useRenderCounter;
