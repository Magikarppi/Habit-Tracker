import React from 'react';

export interface UsernameField {
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  reset?: () => void;
}

export interface PasswordField extends UsernameField {}

export interface HabitNameField extends UsernameField {}

export interface SignUpProps {
  username: UsernameField;
  password: PasswordField;
  handleSignUpSubmit: (event: React.ChangeEvent<HTMLFormElement>) => void;
}

export interface LoginProps {
  username: UsernameField;
  password: PasswordField;
  handleLoginSubmit: (event: React.ChangeEvent<HTMLFormElement>) => void;
}

export interface HomeProps {
  quote: string;
  quoteAuthor: string;
  loggedInUser: LoggedInUser | null;
  handleLogout: () => void;
  habitsToShow: HabitsToShow;
  showHabitForm: boolean;
  handleHabitSubmit: (event: React.ChangeEvent<HTMLFormElement>) => void;
  habitName: HabitNameField;
  toggleHabitForm: () => void;
  handleCompletion: (habit: HabitType) => void;
}

export interface LoggedInUser {
  username: string;
  id: string;
  habits: HabitType[];
}

export interface AddHabitProps {
  handleHabitSubmit: (event: React.ChangeEvent<HTMLFormElement>) => void;
  habitName: HabitNameField;
}

export interface HabitMoreInfoProps {
  habit: HabitType | undefined;
  handleRemove: (habit: HabitType) => void;
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
