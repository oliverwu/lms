import Logger from './Logger';
import trunk from 'redux-thunk';
import { applyMiddleware } from 'redux';

export default applyMiddleware(trunk, Logger)