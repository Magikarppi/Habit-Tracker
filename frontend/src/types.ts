import React from 'react';

export interface UsernameField {
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  reset?: () => void;
}

export interface PasswordField extends UsernameField {}

export interface HabitNameField extends UsernameField {}

export interface LoginSignUpProps {
  username: UsernameField;
  password: PasswordField;
  handleSignUpSubmit?: (event: React.ChangeEvent<HTMLFormElement>) => void;
  handleLoginSubmit?: (event: React.ChangeEvent<HTMLFormElement>) => void;
  // handleGoBack: () => void;
}

export interface HeaderProps {
  loggedInUser: LoggedInUser | null;
  handleLogout: () => void;
}

export interface HomeProps {
  loggedInUser: LoggedInUser | null;
  handleLogout: () => void;
  habitsToShow: HabitsToShow;
  handleHabitSubmit: (event: React.ChangeEvent<HTMLFormElement>) => void;
  habitName: HabitNameField;
  handleCompletion: (habit: HabitType) => void;
  // handleGoBack: () => void;
  showHabitForm: boolean;
  toggleHabitForm: () => void;
}

export interface LoggedInUser {
  username: string;
  id: string;
  habits: HabitType[];
}

export interface AddHabitProps {
  handleHabitSubmit: (event: React.ChangeEvent<HTMLFormElement>) => void;
  toggleHabitForm: () => void;
  habitName: HabitNameField;
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
