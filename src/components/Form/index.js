import React, { Component, Fragment } from 'react';
import { map } from 'lodash/fp';

const CATEGORY_OPTIONS = ['none', 'grocery', 'auto', 'clothing', 'transportation'];
const ACCOUNT_OPTIONS = ['none', 'cash', 'checkingAccount', 'credit'];

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            category: '',
            account: '',
            amount: '',
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleAccountChange = this.handleAccountChange.bind(this);
        this.handleAmountChange = this.handleAmountChange.bind(this);
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
        const { handleOnSubmit } = this.props;

        return (
            <div>
                <form onSubmit={e => handleOnSubmit(e, { ...this.state })}>
                    <div>
                        <Input
                            type="text"
                            label="Name"
                            name="transactionName"
                            value={name || ''}
                            onChange={e => this.handleNameChange(e)}
                        />
                    </div>

                    <div>
                        <Select
                            label="category"
                            options={CATEGORY_OPTIONS}
                            value={category}
                            selectOnChangeHandler={this.handleCategoryChange}
                        />
                    </div>

                    <div>
                        <Select
                            label="account"
                            options={ACCOUNT_OPTIONS}
                            value={account}
                            selectOnChangeHandler={this.handleAccountChange}
                        />
                    </div>

                    <div>
                        <Input
                            type="text"
                            label="Amount"
                            name="transactionAmount"
                            value={amount || ''}
                            onChange={e => this.handleAmountChange(e)}
                        />
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export function Input({ type, name, label, onChange, value }) {
    return (
        <Fragment>
            <label htmlFor={name}>{label}</label>
            <input type={type} name={name} id={name} value={value} onChange={onChange} />
        </Fragment>
    );
}

export function Select({ label, options, value, selectOnChangeHandler, selected }) {
    return (
        <Fragment>
            <label htmlFor={label}>{label}</label>
            <select value={value} onChange={selectOnChangeHandler}>
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
