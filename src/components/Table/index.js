import React, { Component } from 'react';
import { map, sortBy, isEqual } from 'lodash/fp';
import axios from 'axios';
import Form, { Input, Select } from '../Form';

const CATEGORY_OPTIONS = ['none', 'grocery', 'auto', 'clothing', 'transportation'];
const ACCOUNT_OPTIONS = ['none', 'cash', 'checkingAccount', 'credit'];

export default class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            total: 0,
            itemToEdit: undefined,
        };

        this.handleRemoveItem = this.handleRemoveItem.bind(this);
        this.handleEditItem = this.handleEditItem.bind(this);
        this.handleSort = this.handleSort.bind(this);
    }

    componentDidMount() {
        axios
            .get(URL)
            .then(res => {
                const total = res.data.reduce(function(acc, curr) {
                    return acc + curr.amount;
                }, 0);

                this.setState({
                    data: [...res.data],
                    total,
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

    handleSort(e) {
        const sorted = sortBy([e.target.value], this.state.data);

        if (isEqual(sorted, this.state.data)) {
            this.setState({
                data: sorted.reverse(),
            });
        } else {
            this.setState({
                data: sorted,
            });
        }
        e.preventDefault();
    }

    render() {
        if (this.state.data.length === 0) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <div>
                    <b>Total: </b> {this.state.total}
                </div>

                <Select
                    label="Sort by"
                    options={['name', 'category', 'account', 'amount']}
                    selectOnChangeHandler={e => this.handleSort(e)}
                />

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

                {this.state.itemToEdit != undefined ? <Form data={{ ...this.state.itemToEdit }} /> : null}
            </div>
        );
    }
}
