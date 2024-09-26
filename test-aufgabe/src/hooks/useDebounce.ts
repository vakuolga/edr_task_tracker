import { useEffect, useState } from "react"

const useDebounce = <T>(value: T, delay: number): T => {
    const [newValue, setNewValue] = useState<T>(value)

    useEffect(() => {
        const debounce = setTimeout(() => {
            setNewValue(value)
        }, delay)

        return () => clearTimeout(debounce)
    }, [value, delay])

    return newValue
}

export default useDebounce;