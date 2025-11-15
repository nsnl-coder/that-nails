import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store/index.store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
