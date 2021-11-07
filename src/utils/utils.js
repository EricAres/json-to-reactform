export const operatorsMap = {
    gt: function (a, b) {
        return a > b;
    },
    gte: function (a, b) {
        return a >= b;
    },
    eq: function (a, b) {
        return a === b;
    },
    lt: function (a, b) {
        return a < b;
    },
    lte: function (a, b) {
        return a <= b;
    },
};

export const validateRequired = input => {
    if (['checkbox', 'radio'].includes(input.type)) {
        const isChecked = document.querySelector(
            `[name="${input.name}"]:checked`
        );

        if (!isChecked) {
            return `You must select an option for "${input.name}"`;
        }
    } else {
        if (input.value === '') {
            return `You must enter a value for "${input.name}"`;
        }
    }

    return false;
};

export const validatePattern = (input, pattern) => {
    const regex = new RegExp(pattern, 'g');

    if (!regex.test(input.value)) {
        return `Value in field "${input.name}" does not match the required pattern.`;
    }

    return false;
};

export const validateMatch = (onInput, fromInput) => {
    if (fromInput.value !== onInput.value) {
        return `Value in fields "${fromInput.name}" and "${onInput.name}" do not match.`;
    }

    return false;
};

export const checkOperations = (rule, value) => {
    const operatorsInRule = Object.keys(operatorsMap).filter(operator =>
        Object.keys(rule).includes(operator)
    );
    let matches = 0;

    operatorsInRule.forEach(operator => {
        if (typeof rule[operator] === 'number') {
            value = Number(value);
        } else if (typeof rule[operator] === 'boolean') {
            value = value === 'true' ? true : false;
        }

        if (operatorsMap[operator](value, rule[operator])) {
            matches += 1;
        }
    });

    if (matches >= operatorsInRule.length) {
        return true;
    } else {
        return false;
    }
};
