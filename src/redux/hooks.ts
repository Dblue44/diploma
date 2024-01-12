import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux';

import type {AppDispatch, RootStore} from './store'

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootStore> = useSelector;