function Operations({data = []}) {
    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Amount</th>
                        <th>Category</th>
                        <th>Concept</th>
                        <th>Date</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((op, index) => (
                            <tr key={op.id}>
                                <td>{op.amount}</td>
                                <td>{op.categoryName}</td>
                                <td>{op.concept}</td>
                                <td>{op.date}</td>
                                <td>{op.type}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Operations;