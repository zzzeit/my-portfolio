import { useEffect, useState } from 'react'

export default function useOnScreen(refOrSelector, rootMargin = '0px') {
    const [isOn, setIsOn] = useState(false)

    useEffect(() => {
        let element = null
        if (!refOrSelector) return

        if (typeof refOrSelector === 'string') {
            element = document.querySelector(refOrSelector)
        } else if (refOrSelector && 'current' in refOrSelector) {
            element = refOrSelector.current
        } else if (refOrSelector instanceof Element) {
            element = refOrSelector
        }

        if (!element) return

        const observer = new IntersectionObserver(
            ([entry]) => setIsOn(entry.isIntersecting),
            { rootMargin }
        )

        observer.observe(element)

        return () => observer.disconnect()
    }, [refOrSelector, rootMargin])

    return isOn
}
