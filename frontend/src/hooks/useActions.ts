import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreatorsExport } from '../state/index'

export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(ActionCreatorsExport, dispatch)
}
