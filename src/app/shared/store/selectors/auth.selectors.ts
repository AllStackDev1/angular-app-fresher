import { createSelector, createFeatureSelector } from '@ngrx/store';
import { Auth } from '../models/auth.model';

export const selectAuth = createFeatureSelector<Readonly<Auth>>('auth');

export const selectUser = createSelector(selectAuth, (auth) => auth.user);
