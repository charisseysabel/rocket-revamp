import React, { Fragment, Component } from 'react';
import axios from 'axios';
import { BUDGET } from '../../api';
import Budget from './presenter';

const CREATE_BUDGET_DIALOG = 'create-budget-dialog';

export default class Container extends Component {
    constructor() {
        super();
        this.state = { budget: [] };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios
            .get(BUDGET)
            .then(res => {
                this.setState({
                    budget: [...res.data],
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleSubmit(e, item, handleClose) {
        axios
            .post(BUDGET, {
                ...item,
            })
            .then(res => {
                this.setState({
                    budget: res.data,
                });
            })
            .catch(function(err) {
                console.log(err);
            });
        handleClose(e);
    }

    render() {
        const dialog = document.getElementById(CREATE_BUDGET_DIALOG);
        const { budget } = this.state;

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
                <Dialog handleClose={handleCloseModal} handleSubmit={this.handleSubmit} />
                <Budget budget={budget} />
            </Fragment>
        );
    }
}

class Dialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            budget: '',
            amount: '',
        };
        this.handleChange = this.handleChange.bind(this);
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
        const { handleClose, handleSubmit } = this.props;
        return (
            <dialog id={CREATE_BUDGET_DIALOG}>
                <form onSubmit={e => handleSubmit(e, { ...this.state }, handleClose)}>
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
                        <button type="submit">Create</button>
                        <button onClick={e => handleClose(e)}>Cancel</button>
                    </div>
                </form>
            </dialog>
        );
    }
}
