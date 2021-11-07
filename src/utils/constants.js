export const formTemplate = {
    fields: [
        {
            name: 'email',
            label: 'Email Address',
            type: 'email',
        },
        {
            name: 'password',
            label: 'Password',
            type: 'password',
        },
        {
            name: 'password_2',
            label: 'Re-enter Password',
            type: 'password',
        },
        {
            name: 'firstname',
            label: 'First Name',
            type: 'text',
        },
        {
            name: 'lastname',
            label: 'Last Name',
            type: 'text',
        },
        {
            name: 'marital_status',
            label: 'Marital Status',
            type: 'select',
            options: ['Single', 'Married', 'Divorced', 'Widowed'],
        },
        {
            name: 'age',
            label: 'Age',
            type: 'number_int',
        },
        {
            name: 'can_drive',
            label: 'Do you hold a valid drivers license?',
            type: 'radio',
            options: ['Yes', 'No'],
        },
        {
            name: 'terms',
            label: 'Agree to terms and conditions',
            type: 'checkbox',
            options: ['Yes'],
        },
    ],
    rules: [
        {
            type: 'valid',
            on: 'email',
            pattern: '^[^@\\s]+@[^@\\s]+.[^@\\s]+$',
        },
        {
            type: 'valid',
            on: 'email',
            required: true,
        },
        {
            type: 'valid',
            on: 'password',
            required: true,
        },
        {
            type: 'valid',
            from: 'password',
            on: 'password_2',
            match: true,
        },
        {
            type: 'show',
            from: 'age',
            on: 'can_drive',
            gte: 17,
            lte: 60,
        },
        {
            type: 'valid',
            on: 'terms',
            required: true,
        },
    ],
};
