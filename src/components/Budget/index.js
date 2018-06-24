import React, { Fragment } from 'react';
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

function Dialog({ handleClose }) {
    return (
        <dialog id={CREATE_BUDGET_DIALOG}>
            <form>
                <fieldset>
                    <label htmlFor="budget">Budget Name</label>
                    <input type="text" name="budget" id="budget" />

                    <label htmlFor="amount">Amount</label>
                    <input type="text" name="amount" id="amount" />
                </fieldset>
                <div>
                    <button>Create Another</button>
                </div>
                <div>
                    <button>Create</button>
                </div>
            </form>
            <button onClick={e => handleClose(e)}>Cancel</button>
        </dialog>
    );
}
