import React, { Component } from 'react';
import Project from '../../components/Project/Project';
import axios from 'axios';
import { Container } from 'reactstrap';
import { getMonthName } from '../../store/utility';
import addButton from '../../assets/images/add-button.png';

class Projects extends Component {

    constructor(props) {
        super(props);
        this.state = {
            jsonData: null
        }
    }

    componentDidMount () {
        const URL = 'https://www.intqa.decorist.com/api/v1/solutions/design-solutions/';
        axios
        .get(URL, {params: { email: localStorage.getItem('email') }})
        .then(response => {
            let data = response.data.results.map(obj => {
                let dateObj = new Date(obj.order.order_date);
                return {
                    key: obj.key,
                    designType: obj.target_item ? obj.target_item.item_name : '',
                    roomType: obj.target_item ? obj.target_item.room.name : '',
                    orderDate: getMonthName(dateObj.getMonth()) + " " + dateObj.getDate() + ", " + dateObj.getFullYear() ,
                    status: obj.status,
                    designer: obj.designer ? obj.designer.full_name : 'Not yet matched',
                    projectInfo: obj.product ? obj.product.description.replace(/(<([^>]+)>)/ig, "") : ''
                }
            })
            this.setState({jsonData: data});
        })
    }

    render () {
        let projects = "No Project Found";
        if(this.state.jsonData && this.state.jsonData > 0) {
            projects = this.state.jsonData.map(obj => {
                return <Project key={obj.key} project={obj}/>;
            })
        }
        return (
            <Container>
                <div className="text-center headline">
                    <h2>Your Projects</h2>
                </div>
                <div style={{margin: '0 80px'}}>
                    <div className="cart-inline ">
                        <div className="add-item">
                            <a href="#">
                                <div className="add-button" style={{
                                    background: `url(${addButton})`
                                }}></div>
                                Start a New Project
                            </a>
                        </div>
                    </div>
                </div>
                {projects}
                <div style={{width:'100%', height:'100px'}}>

                </div>
            </Container>
        );
    }
}

export default Projects;