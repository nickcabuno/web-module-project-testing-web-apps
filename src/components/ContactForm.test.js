import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm/>);
});

test('renders the contact form header', ()=> {
    render(<ContactForm/>);
    const header = screen.queryByText(/contact form/i);
    expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm/>);
    const shortName = "me"
    const firstNameInput = screen.getByLabelText(/first name*/i);
    userEvent.type(firstNameInput, shortName);
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm/>);
    const nothing = ""
    const firstNameInput = screen.getByLabelText(/first name*/i);
    userEvent.type(firstNameInput, nothing);
    const lastNameInput = screen.getByLabelText(/last name*/i);
    userEvent.type(lastNameInput, nothing);
    const emailInput = screen.getByLabelText(/email*/i);
    userEvent.type(emailInput, nothing);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm/>);
    const nothing = ""
    const validName = "Moderna"
    const firstNameInput = screen.getByLabelText(/first name*/i);
    userEvent.type(firstNameInput, validName);
    const lastNameInput = screen.getByLabelText(/last name*/i);
    userEvent.type(lastNameInput, validName);
    const emailInput = screen.getByLabelText(/email*/i);
    userEvent.type(emailInput, nothing);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>);
    const invalidEmail = "email"
    const emailInput = screen.getByLabelText(/email*/i);
    userEvent.type(emailInput, invalidEmail);
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>);
    const nothing = ""
    // const validName = "Moderna"
    // const validEmail = "moderna@gmail.com"
    // const firstNameInput = screen.getByLabelText(/first name*/i);
    // userEvent.type(firstNameInput, validName);
    const lastNameInput = screen.getByLabelText(/last name*/i);
    userEvent.type(lastNameInput, nothing);
    // const emailInput = screen.getByLabelText(/email*/i);
    // userEvent.type(emailInput, validEmail);
    const button = screen.getByRole("button");
    userEvent.click(button);
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>);
    const validName = "Moderna"
    const validEmail = "moderna@gmail.com"
    const firstNameInput = screen.getByLabelText(/first name*/i);
    userEvent.type(firstNameInput, validName);
    const lastNameInput = screen.getByLabelText(/last name*/i);
    userEvent.type(lastNameInput, validName);
    const emailInput = screen.getByLabelText(/email*/i);
    userEvent.type(emailInput, validEmail);
    const button = screen.getByRole("button");
    userEvent.click(button);
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>);
    const validName = "Moderna"
    const validEmail = "moderna@gmail.com"
    const firstNameInput = screen.getByLabelText(/first name*/i);
    userEvent.type(firstNameInput, validName);
    const lastNameInput = screen.getByLabelText(/last name*/i);
    userEvent.type(lastNameInput, validName);
    const emailInput = screen.getByLabelText(/email*/i);
    userEvent.type(emailInput, validEmail);
    const messageInput = screen.getByLabelText(/message/i);
    userEvent.type(messageInput, validName);
    const button = screen.getByRole("button");
    userEvent.click(button);
});