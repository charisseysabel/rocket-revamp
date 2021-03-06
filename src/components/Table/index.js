import React, { Component } from 'react';
import Form, { Select } from '../Form';

export default class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            total: 0,
            itemToEdit: undefined,
        };

        this.handleEditItem = this.handleEditItem.bind(this);
    }

    handleEditItem(e, item) {
        this.setState({
            itemToEdit: { ...item },
        });
        e.preventDefault();
    }

    render() {
        const { data, total, handleSort, handleRemove } = this.props;
        const dataWithNiceDates = data.map(item => {
            const dateItem = new Date(item['date']);
            const dateString = dateItem.getFullYear() + '-' + (dateItem.getMonth() + 1) + '-' + dateItem.getDate();

            return {
                ...item,
                date: dateString,
            };
        });

        if (data.length === 0) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <div>
                    <b>Total: </b> {total}
                </div>

                <Select
                    label="Sort by"
                    options={['name', 'category', 'account', 'amount', 'date']}
                    selectOnChangeHandler={handleSort}
                />

                <table>
                    <tbody>
                        {dataWithNiceDates.map((item, i) => {
                            return (
                                <tr key={item['_id'] || i}>
                                    <td>{item['date']}</td>
                                    <td>{item['name']}</td>
                                    <td>{item['category']}</td>
                                    <td>{item['account']}</td>
                                    <td>{item['amount']}</td>
                                    <td>
                                        <button onClick={e => handleRemove(e, item)}>Remove</button>
                                        <button onClick={e => this.handleEditItem(e, item)}>Edit</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {this.state.itemToEdit !== undefined ? <Form data={{ ...this.state.itemToEdit }} /> : null}
            </div>
        );
    }
}
