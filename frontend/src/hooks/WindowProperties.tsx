import { useEffect, useState } from "react";

export function useGetWindowSize() {
  const [windowSize, setSize] = useState<{width: number, height: number}>({width: 0, height: 0})

  const handleResize = () => {
    const width = window.innerWidth
    const height = window.innerHeight
    setSize({width,height})
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return {windowSize}
}