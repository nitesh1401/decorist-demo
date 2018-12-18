import React from 'react';
import { Col } from 'reactstrap';
import '../../App.css';

const project = props => {
    return (
        <div className="project-bordered">
            <div className="project-details clearfix">
                <Col xs="3" className="InlineBlock">
                    <div className="details-title"> {props.project.designType} </div>
                    <div className="details-subtitle-mont"> {props.project.roomType} </div>
                </Col>
                <Col xs="2" className="InlineBlock">
                    <div className="details-title"> STARTED ON </div>
                    <div className="details-subtitle"> {props.project.orderDate} </div>
                </Col>
                <Col xs="2" className="InlineBlock">
                    <div className="details-title"> PROJECT # </div>
                    <div className="details-subtitle"> {props.project.key} </div>
                </Col>
                <Col xs="5" className="InlineBlock">
                    <div className="details-title text-right"> STATUS </div>
                    <div className="details-subtitle text-right"> {props.project.status} </div>
                </Col>
            </div>
            <div className="project-info clearfix">
                <Col xs="3" className="InlineBlock verticalAlign">
                    <div className="info-title"> Designer </div>
                    <div className="info-subtitle"> {props.project.designer} </div>
                </Col>
                <Col xs="5" className="InlineBlock verticalAlign">
                    <div className="info-title"> Project info </div>
                    <div className="info-subtitle"> {props.project.projectInfo} </div>
                </Col>
                <Col xs="4" className="InlineBlock verticalAlign">
                    <a href="#" className="d-btn btn-md pink btn-status" > Complete Project Details </a>
                </Col>
            </div>
        </div>
    );
};

export default project;