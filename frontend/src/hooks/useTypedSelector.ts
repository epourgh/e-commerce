import { useSelector, TypedUseSelectorHook } from 'react-redux'
import { RootStateExport } from '../state/index'

export const useTypedSelector: TypedUseSelectorHook<RootStateExport> = useSelector;