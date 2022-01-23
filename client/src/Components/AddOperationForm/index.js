import Form from '../Form';

function AddOperationForm({ onSubmit, errorMessage, invalidFields = {} }) {

    const fields = {
        amount: {
            type: "number",
            placeholder: "Amount",
            label: "Amount",
            required: true,
            value: ""
        },
        concept: {
            type: "text",
            placeholder: "Concept",
            label: "Concept",
            required: false,
            value: ""
        },
        categoryName: {
            type: "text",
            placeholder: "Category",
            label: "Category",
            required: false,
            value: ""
        },
        type: {
            type: "text",
            placeholder: "Type",
            label: "Type",
            required: true,
            value: ""
        },
        date: {
            type: "date",
            placeholder: "Date",
            label: "Date",
            required: false,
            value: ""
        }
    };

    return (
        <div className="form-wrapper">
            <Form 
                fields={fields} 
                onSubmit={onSubmit} 
                buttonText={"Add"} 
                invalidFields={invalidFields}
            />
            {
                (errorMessage?.length > 0) && <div className="submit-errors">{errorMessage}</div>
            }
        </div>
    );
}

export default AddOperationForm;