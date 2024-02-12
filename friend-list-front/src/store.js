import {configureStore} from '@reduxjs/toolkit'
import counterSlice from './counterSlice'
import SumUp from './SumUp'

export default configureStore({
    reducer: {
        counter: counterSlice,
        newCounter: SumUp,
    },
})
