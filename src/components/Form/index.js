import React, { Component, Fragment } from 'react';
import { map } from 'lodash/fp';
import axios, { post } from 'axios';

const CATEGORY_OPTIONS = ['none', 'grocery', 'auto', 'clothing', 'transportation'];
const ACCOUNT_OPTIONS = ['none', 'cash', 'checkingAccount', 'credit'];

class Form extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            category: 'none',
            account: 'none',
            amount: '',
        };

        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleAccountChange = this.handleAccountChange.bind(this);
        this.handleAmountChange = this.handleAmountChange.bind(this);
    }

    handleOnSubmit(e) {
        post(URL, {
            ...this.state,
        })
            .then(function(res) {
                console.log(res);
            })
            .catch(function(err) {
                console.log(err);
            });
        e.preventDefault();
    }

    handleNameChange(e) {
        this.setState({
            name: e.target.value,
        });
    }

    handleCategoryChange(e) {
        this.setState({
            category: e.target.value,
        });
    }

    handleAccountChange(e) {
        this.setState({
            account: e.target.value,
        });
    }

    handleAmountChange(e) {
        this.setState({
            amount: e.target.value,
        });
    }

    render() {
        const { name, category, account, amount } = this.state;

        return (
            <div>
                <form onSubmit={e => this.handleOnSubmit(e)}>
                    <div>
                        <Input
                            type="text"
                            label="Name"
                            name="transactionName"
                            value={name}
                            inputOnChangeHandler={this.handleNameChange}
                        />
                    </div>

                    <div>
                        <Select
                            label="category"
                            options={CATEGORY_OPTIONS}
                            selectOnChangeHandler={this.handleCategoryChange}
                        />
                    </div>

                    <div>
                        <Select
                            label="account"
                            options={ACCOUNT_OPTIONS}
                            selectOnChangeHandler={this.handleAccountChange}
                        />
                    </div>

                    <div>
                        <Input
                            type="text"
                            label="Amount"
                            name="transactionAmount"
                            inputOnChangeHandler={this.handleAmountChange}
                        />
                    </div>

                    <button type="submit" onSubmit={e => this.handleOnSubmit(e)}>
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}

function Input({ type, label, name, value, inputOnChangeHandler }) {
    return (
        <Fragment>
            <label htmlFor={name}>{label}</label>
            <input type={type} name={name} id={name} value={value} onChange={inputOnChangeHandler} />
        </Fragment>
    );
}

function Select({ label, options, selectOnChangeHandler, selected }) {
    return (
        <Fragment>
            <label htmlFor="category">Category</label>
            <select onChange={selectOnChangeHandler}>
                {map(
                    value => (
                        <option value={value} key={value}>
                            {value}
                        </option>
                    ),
                    options
                )}
            </select>
        </Fragment>
    );
}

export default Form;
