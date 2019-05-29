import React, { Component } from "react";
import Header from "../../Components/header";
import "../container_style.css";


class EditProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            name: '',
            email: '',
            date: '',
        }
    }

    render() {
        return(
            <div>
                <Header/>
                Edit Page
            </div>
        )
    }
}

export default EditProfile;