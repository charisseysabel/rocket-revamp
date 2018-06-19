import React, { Component, Fragment } from 'react';
import { map } from 'lodash/fp';
import axios from 'axios';

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

        if (budget.length == 0) {
            return <Fragment>asdas</Fragment>;
        }

        return (
            <Fragment>
                {map(
                    item => (
                        <div key={item['_id']}>
                            {item.name}
                            {item.amount}
                        </div>
                    ),
                    budget
                )}
            </Fragment>
        );
    }
}
