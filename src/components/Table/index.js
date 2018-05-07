import React, { Component } from 'react';
import axios from 'axios';


export default class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };

        this.handleRemoveItem = this.handleRemoveItem.bind(this);
    }

    componentDidMount() {
        axios.get(URL)
            .then(res => {
                this.setState({
                    data: [...res.data],
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleRemoveItem(e, item) {
        axios({
            method: 'delete',
            url: URL,
            data: {
                _id: item['_id'],
            },
        });
        e.preventDefault();
    }

    render() {
        if (this.state.data.length === 0) {
            return <div>Loading...</div>;
        }

        return (
            <div>
                <table>
                    <tbody>
                        {this.state.data.map(item => {
                            return (
                                <tr key={item['_id']}>
                                    <td>{item['name']}</td>
                                    <td>{item['category']}</td>
                                    <td>{item['account']}</td>
                                    <td>{item['amount']}</td>
                                    <td>
                                        <button onClick={e => this.handleRemoveItem(e, item)}>Remove</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}
