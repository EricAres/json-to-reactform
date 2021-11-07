import React from 'react';
import DynamicForm from './components/DynamicForm';
import { formTemplate } from './utils/constants';

const App = () => {
    return (
        <div className="container">
            <h2 className="my-5">Dynamic Form</h2>
            <DynamicForm template={formTemplate} />
        </div>
    );
};

export default App;
