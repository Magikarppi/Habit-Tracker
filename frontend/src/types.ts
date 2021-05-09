import React from 'react';

export interface UsernameField {
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  reset?: () => void;
}

export interface PasswordField extends UsernameField {}

export interface HabitNameField extends UsernameField {}

export interface LoginSignUpInputValues {
  username: string;
  password: string;
}

export interface HabitInputValue {
  habitName: string;
}

export interface LoginSignUpProps {
  handleSignUpSubmit: (values: LoginSignUpInputValues) => void;
  handleLoginSubmit: (values: LoginSignUpInputValues) => void;
}

export interface HeaderProps {
  loggedInUser: LoggedInUser | null;
  handleLogout: () => void;
}

export interface HomeProps {
  loggedInUser: LoggedInUser | null;
  habitsToShow: HabitsToShow;
  handleHabitSubmit: (values: HabitInputValue) => void;
  handleCompletion: (habit: HabitType) => void;
  showHabitForm: boolean;
  toggleHabitForm: () => void;
}

export interface LoggedInUser {
  username: string;
  id: string;
  habits: HabitType[];
}

export interface AddHabitProps {
  handleHabitSubmit: (values: HabitInputValue) => void;
  toggleHabitForm: () => void;
}

export interface HabitMoreInfoProps {
  habit: HabitType | undefined;
  handleRemove: (habit: HabitType) => void;
}

export interface HabitProps {
  habit: HabitType | undefined;
  handleCompletion: (habit: HabitType) => void;
}

export type ErrorSuccessMsg = string | null;

export interface Completion {
  thisDay: number;
  thisMonth: number;
  thisYear: number;
}

export interface HabitType {
  id: string;
  name: string;
  completions: Completion[];
}

export type HabitsToShow = HabitType[];
