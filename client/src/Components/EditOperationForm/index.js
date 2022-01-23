import Form from '../Form';

function EditOperationForm({ currentValues, onSubmit, errorMessage, invalidFields = {} }) {

    const fields = {
        amount: {
            type: "number",
            placeholder: "Amount",
            label: "Amount",
            required: true,
            value: currentValues.amount
        },
        concept: {
            type: "text",
            placeholder: "Concept",
            label: "Concept",
            required: false,
            value: currentValues.concept
        },
        categoryName: {
            type: "text",
            placeholder: "Category",
            label: "Category",
            required: false,
            value: currentValues.categoryName
        },
        date: {
            type: "date",
            placeholder: "Date",
            label: "Date",
            required: false,
            value: currentValues.date
        }
    };

    return (
        <div className="form-wrapper">
            <Form 
                fields={fields} 
                onSubmit={onSubmit} 
                buttonText={"Update"} 
                invalidFields={invalidFields}
            />
            {
                (errorMessage?.length > 0) && <div className="submit-errors">{errorMessage}</div>
            }
        </div>
    );
}

export default EditOperationForm;