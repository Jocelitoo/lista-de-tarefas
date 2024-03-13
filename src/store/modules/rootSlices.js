import { combineSlices } from '@reduxjs/toolkit';

import { loginSlice } from './login/loginSlices';

export const rootReducer = combineSlices(loginSlice);
