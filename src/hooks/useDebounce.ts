import {useCallback, useRef} from 'react'

export default function useDebounce (callback: (...args: any[]) => void, delay: number) {

	const timer = useRef<any>()
	
	const debounceCallback = useCallback<() => void>( (...args) => {
		if (timer.current) {
			clearTimeout(timer.current)
		}
		timer.current = setTimeout(() => {
			callback(...args)
		}, delay);
	}, [callback, delay])

	return debounceCallback
	
}