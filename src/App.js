import axios from 'axios';
import { sortBy, isEqual } from 'lodash/fp';
import React, { Component } from 'react';
import Form from './components/Form';
import Table from './components/Table';

const URL = 'http://localhost:3001/api/add';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            total: 0,
        };

        this.handleSort = this.handleSort.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    componentDidMount() {
        axios
            .get(URL)
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
        axios
            .post(URL, {
                ...item,
            })
            .then(res => {
                this.setState(prevState => {
                    return {
                        data: [...prevState.data, item],
                        total: prevState.total,
                    };
                });
                console.log(res);
            })
            .catch(function(err) {
                console.log(err);
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
                <Table {...tableProps} handleSort={this.handleSort} />
            </div>
        );
    }
}

export default App;
