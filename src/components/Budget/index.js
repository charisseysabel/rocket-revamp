import React, { Fragment, Component } from 'react';
import axios from 'axios';
import { BUDGET } from '../../api';
import Budget from './presenter';

const CREATE_BUDGET_DIALOG = 'create-budget-dialog';

export default function Container() {
    const dialog = document.getElementById(CREATE_BUDGET_DIALOG);

    const handleOpenModal = e => {
        dialog.showModal();
        e.preventDefault();
    };

    const handleCloseModal = e => {
        dialog.close();
        e.preventDefault();
    };

    return (
        <Fragment>
            <h1>Budget</h1>
            <button onClick={e => handleOpenModal(e)}>Create new budget</button>
            <Dialog handleClose={handleCloseModal} />
            <Budget />
        </Fragment>
    );
}

class Dialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            budget: '',
            amount: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e, item) {
        axios
            .post(BUDGET, {
                ...item,
            })
            .then(res => {
                console.log(res);
            })
            .catch(function(err) {
                console.log(err);
            });
        e.preventDefault();
    }

    handleChange(e, type) {
        console.log('changing!');
        this.setState({
            [type]: e.target.value,
        });
        e.preventDefault();
    }

    render() {
        const { budget, amount } = this.state;
        const { handleClose } = this.props;
        return (
            <dialog id={CREATE_BUDGET_DIALOG}>
                <form onSubmit={e => this.handleSubmit(e, { ...this.state })}>
                    <fieldset>
                        <label htmlFor="budget">Budget Name</label>
                        <input
                            type="text"
                            name="budget"
                            id="budget"
                            value={budget}
                            onChange={e => this.handleChange(e, 'budget')}
                        />

                        <label htmlFor="amount">Amount</label>
                        <input
                            type="text"
                            name="amount"
                            id="amount"
                            value={amount}
                            onChange={e => this.handleChange(e, 'amount')}
                        />
                    </fieldset>
                    <div>
                        <button>Create Another</button>
                    </div>
                    <div>
                        <button type="submit">Create</button>
                        <button onClick={e => handleClose(e)}>Cancel</button>
                    </div>
                </form>
            </dialog>
        );
    }
}
