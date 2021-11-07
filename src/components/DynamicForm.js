import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import {
    validateRequired,
    validatePattern,
    validateMatch,
    checkOperations,
} from '../utils/utils';

const DynamicForm = ({ template }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(false);

    const fields = template.fields;
    const validationRules = template.rules.filter(
        rule => rule.type === 'valid'
    );
    const displayRules = template.rules.filter(rule => rule.type === 'show');

    const handleFormSubmission = e => {
        let errorMsg = false;

        validationRules.forEach(rule => {
            const input = document.querySelector(`[name="${rule.on}"]`);

            if (rule.pattern) {
                errorMsg = validatePattern(input, rule.pattern);
            }
            if (rule.match && errorMsg === false) {
                const targetInput = document.querySelector(
                    `[name="${rule.from}"]`
                );
                errorMsg = validateMatch(input, targetInput);
            }
            if (rule.required && errorMsg === false) {
                errorMsg = validateRequired(input);
            }

            if (errorMsg) {
                setErrorMessage(errorMsg);
                setTimeout(() => {
                    setErrorMessage(false);
                }, 3000);
                e.preventDefault();
            }
        });
    };

    useEffect(() => {
        setIsLoading(true);

        displayRules.forEach(rule => {
            const inputs = document.querySelectorAll(`[name="${rule.from}"]`);
            const targetContainer = document.querySelector(
                `#${rule.on}-container`
            );

            targetContainer.style.display = 'none';

            [...inputs].forEach(input => {
                let event = 'onchange';
                if (
                    ['text', 'password', 'email', 'number'].includes(input.type)
                ) {
                    event = 'oninput';
                }

                input[event] = function displayValidator(e) {
                    const value = input.value;

                    let matches = checkOperations(rule, value);

                    if (matches) {
                        targetContainer.style.display = 'block';
                    } else {
                        targetContainer.style.display = 'none';
                    }
                };
            });
        });

        setIsLoading(false);
    }, [displayRules]);

    return (
        <>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

            <Form
                className={`dynamic-form ${isLoading ? 'hidden' : 'show'}`}
                onSubmit={handleFormSubmission}
            >
                {fields.map(({ name, label, type, options }, idx) => {
                    let elements;

                    if (type === 'radio' || type === 'checkbox') {
                        elements = (
                            <div>
                                {options.map((option, idx) => (
                                    <Form.Check
                                        inline
                                        key={idx}
                                        type={type}
                                        id={`${name}-${idx}`}
                                        name={name}
                                        label={option}
                                        value={option}
                                    />
                                ))}
                            </div>
                        );
                    } else if (
                        type === 'text' ||
                        type === 'password' ||
                        type === 'email'
                    ) {
                        elements = (
                            <Form.Control
                                type={type}
                                name={name}
                                placeholder={`Enter ${label || 'Value'}`}
                            />
                        );
                    } else if (
                        type === 'number_int' ||
                        type === 'number_float' ||
                        type === 'number'
                    ) {
                        elements = (
                            <Form.Control
                                type="number"
                                name={name}
                                step={type === 'number_float' ? 'any' : '1'}
                                placeholder={`Enter ${label || 'Value'}`}
                            />
                        );
                    } else if (type === 'select') {
                        elements = (
                            <Form.Select name={name}>
                                {options.map((option, idx) => (
                                    <option key={idx} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </Form.Select>
                        );
                    } else {
                        elements = (
                            <input
                                className={
                                    type === 'range' ? '' : 'form-control'
                                }
                                type={type}
                                name={name}
                                placeholder={`Enter ${label || 'Value'}`}
                            />
                        );
                    }

                    return (
                        <Form.Group
                            key={idx}
                            id={`${name}-container`}
                            className="mb-3"
                            controlId={name}
                        >
                            <Form.Label>{label || ''}</Form.Label>
                            {elements}
                        </Form.Group>
                    );
                })}

                <Button
                    className="mx-auto d-block"
                    variant="primary"
                    type="submit"
                >
                    Submit
                </Button>
            </Form>
        </>
    );
};

export default DynamicForm;
