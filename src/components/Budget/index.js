import React, { Component, Fragment } from 'react';
import { map } from 'lodash/fp';
import axios from 'axios';
import './index.css';

import { BUDGET } from '../../api';

export default class Budget extends Component {
    constructor() {
        super();
        this.state = { budget: [] };
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

    render() {
        const { budget } = this.state;

        if (budget.length === 0) {
            return (
                <Fragment>
                    <h1>Budget</h1>
                    <p>No available data.</p>
                </Fragment>
            );
        }

        return (
            <Fragment>
                <h1>Budget</h1>

                {map(
                    item => (
                        <section key={item['_id']} className="Budget-card">
                            <h2>{item.name}</h2>
                            <div>&euro; {item.amount}</div>
                        </section>
                    ),
                    budget
                )}
            </Fragment>
        );
    }
}
