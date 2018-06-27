import React, { Component, Fragment } from 'react';
import { map } from 'lodash/fp';
import axios from 'axios';
import './index.css';

export default class Budget extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { budget } = this.props;

        if (budget.length === 0) {
            return (
                <Fragment>
                    <p>No available data.</p>
                </Fragment>
            );
        }

        return (
            <Fragment>
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
