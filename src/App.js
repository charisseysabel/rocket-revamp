import axios from 'axios';
import React, { Component } from 'react';
import Form from './components/Form';
import Table from './components/Table';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            total: 0,
        };
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

    render() {
        const { data, total } = this.state;

        return (
            <div>
                <Form data={data} />
                <Table data={data} total={total} />
            </div>
        );
    }
}

export default App;
