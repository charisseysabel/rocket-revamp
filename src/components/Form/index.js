import React, { Component } from 'react';
import axios, { post } from 'axios';


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
        this.handleAccountChange = this.handleCategoryChange.bind(this);
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
                        <label htmlFor="transactionName">Name</label>
                        <input
                            type="text"
                            name="transactionName"
                            id="transactionName"
                            value={name}
                            onChange={e => this.handleNameChange(e)}
                        />
                    </div>

                    <div>
                        <label htmlFor="category">Category</label>
                        <select onChange={e => this.handleCategoryChange(e)}>
                            <option value="none">None</option>
                            <option value="grocery">Groceries</option>
                            <option value="auto">Auto</option>
                            <option value="clothing">Clothing</option>
                            <option value="transportation">Transportation</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="account">Account</label>
                        <select onChange={e => this.handleAccountChange(e)}>
                            <option value="none">None</option>
                            <option value="cash">Cash</option>
                            <option value="checkingAccount">Checking Account</option>
                            <option value="credit">Credit</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="transactionAmount">Amount</label>
                        <input
                            type="text"
                            name="transactionAmount"
                            id="transactionAmount"
                            onChange={e => this.handleAmountChange(e)}
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

export default Form;
