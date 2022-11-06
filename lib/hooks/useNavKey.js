import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { setActiveNavKey } from 'store/redux/ui.slice'

/**
 * @param {String} slug Navigation Bar key
 */
export default function useNavKey(slug) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setActiveNavKey(slug))
  }, [dispatch, slug])
}
