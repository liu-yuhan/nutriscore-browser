import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import "./HomeStyle.css";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.routeChange = this.routeChange.bind(this);
    }
    routeChange() {
        let path = '/register';
        this.props.history.push(path);
    }

    render() {
        return (
            <div className="body">
                <section className="bg">
                </section>
                <Button color="primary" className="login px-4"
                        onClick={this.routeChange}
                >
                    Login
                </Button>
            </div>
        )
    }
}