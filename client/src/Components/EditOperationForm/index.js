import Form from '../Form';

function EditOperationForm({ instance = {}, onSubmit, errorMessage = "", invalidFields = {} }) {

    const fields = {
        amount: {
            type: "number",
            placeholder: "Amount",
            label: "Amount",
            required: true,
            value: instance.amount
        },
        concept: {
            type: "text",
            placeholder: "Concept",
            label: "Concept",
            required: false,
            value: instance.concept
        },
        categoryName: {
            type: "text",
            placeholder: "Category",
            label: "Category",
            required: false,
            value: instance.categoryName
        },
        date: {
            type: "date",
            placeholder: "Date",
            label: "Date",
            required: false,
            value: instance.date
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