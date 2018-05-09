import React, { Component } from 'react';
import { map } from 'lodash/fp';
import axios from 'axios';

const CATEGORY_OPTIONS = ['none', 'grocery', 'auto', 'clothing', 'transportation'];
const ACCOUNT_OPTIONS = ['none', 'cash', 'checkingAccount', 'credit'];

export default class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            itemToEdit: {},
        };

        this.handleRemoveItem = this.handleRemoveItem.bind(this);
        this.handleEditItem = this.handleEditItem.bind(this);
    }

    componentDidMount() {
        axios.get(URL)
            .then(res => {
                this.setState({
                    data: [...res.data],
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleRemoveItem(e, item) {
        axios({
            method: 'delete',
            url: URL,
            data: {
                _id: item['_id'],
            },
        });
        e.preventDefault();
    }

    handleEditItem(e, item) {
        this.setState({
            itemToEdit: { ...item },
        });
    }

    render() {
        if (this.state.data.length === 0) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <table>
                    <tbody>
                        {this.state.data.map(item => {
                            return (
                                <tr key={item['_id']}>
                                    <td>{item['name']}</td>
                                    <td>{item['category']}</td>
                                    <td>{item['account']}</td>
                                    <td>{item['amount']}</td>
                                    <td>
                                        <button onClick={e => this.handleRemoveItem(e, item)}>Remove</button>
                                        <button onClick={e => this.handleEditItem(e, item)}>Edit</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {this.state.itemToEdit.name != undefined ? (
                    <div>
                        <form>
                            <div>
                                <label htmlFor="transactionName">Name</label>
                                <input
                                    type="text"
                                    name="transactionName"
                                    id="transactionName"
                                    value={this.state.itemToEdit.name}
                                />
                            </div>

                            <div>
                                <label htmlFor="category">Category</label>
                                <Select values={CATEGORY_OPTIONS} selected={this.state.itemToEdit.category} />
                            </div>

                            <div>
                                <label htmlFor="account">Account</label>
                                <Select values={ACCOUNT_OPTIONS} selected={this.state.itemToEdit.account} />
                            </div>

                            <div>
                                <label htmlFor="transactionAmount">Amount</label>
                                <input
                                    type="text"
                                    name="transactionAmount"
                                    id="transactionAmount"
                                    value={this.state.itemToEdit.amount}
                                />
                            </div>

                            <button type="submit" onSubmit={e => this.handleOnSubmit(e)}>
                                Submit
                            </button>
                        </form>
                    </div>
                ) : null}
            </div>
        );
    }
}

const Select = ({ values, selected }) => {
    return (
        <select value={selected}>
            {map(
                value => (
                    <option value={value} key={value}>
                        {value}
                    </option>
                ),
                values
            )}
        </select>
    );
};
