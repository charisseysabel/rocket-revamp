import axios from 'axios';
import { sortBy, isEqual, filter } from 'lodash/fp';
import React, { Component } from 'react';
import { ADD } from './api';
import { isValidNumber } from './components/Form/validations';

import Form from './components/Form';
import Table from './components/Table';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            total: 0,
        };

        this.handleSort = this.handleSort.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.handleRemoveItem = this.handleRemoveItem.bind(this);
    }

    componentDidMount() {
        axios
            .get(ADD)
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

    handleOnSubmit(e, item) {
        e.preventDefault();
        if (isValidNumber(item.amount)) {
            console.log('invalid number has been submitted!');
            return;
        } else {
            axios
                .post(ADD, {
                    ...item,
                })
                .then(res => {
                    const total = res.data.reduce(function(acc, curr) {
                        return acc + curr.amount;
                    }, 0);

                    this.setState({
                        data: res.data,
                        total,
                    });
                    console.log(res);
                })
                .catch(function(err) {
                    console.log(err);
                });
        }
    }

    handleRemoveItem(e, item) {
        axios({
            method: 'delete',
            url: ADD,
            data: {
                _id: item['_id'],
            },
        }).then(res => {
            const total = res.data.reduce(function(acc, curr) {
                return acc + curr.amount;
            }, 0);

            this.setState({
                data: res.data,
                total,
            });
        });
        e.preventDefault();
    }

    render() {
        const { data, total } = this.state;
        const tableProps = {
            data,
            total,
        };

        return (
            <div>
                <Form data={data} handleOnSubmit={this.handleOnSubmit} />
                <Table {...tableProps} handleSort={this.handleSort} handleRemove={this.handleRemoveItem} />
            </div>
        );
    }
}

export default App;
