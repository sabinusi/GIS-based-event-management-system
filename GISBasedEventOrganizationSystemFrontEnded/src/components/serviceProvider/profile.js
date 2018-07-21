import React from 'react';
import LeftBar from '../layouts/leftbar';
import { Card, ImageHeader, CardBody, CardFooter } from "react-simple-card";
import constants from './../../constants/consants';
import serviceProviderReducer from '../../reducers/serviceProviderReducer';
import { connect } from 'react-redux';
import { updateProvider } from '../../actions/serviceProviderAction';
import { bindActionCreators } from 'redux';
import swal from 'sweetalert';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            username: '',
            services: []
        };
    }
    componentWillMount() {
        fetch(constants.BASE_URL_SERVICEPROVIDER + 'list').then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                this.setState({
                    fetchError: true
                });
                console.log(response);
            }
        }).then(response => {
            if (!this.state.fetchError) {
                console.log(response);

                response.map((resp) => {
                    if (resp.id == this.props.match.params.id) {
                        this.setState({
                            user: resp,
                            username: resp.username.replace("_", " ").charAt(0).toUpperCase() + resp.username.replace("_", " ").slice(1),
                            services: resp.services
                        });
                        console.log(this.state.services);

                    }
                })



            }

        });
    }
    addProviderToCart() {
        console.log(this.state.user)
        this.props.addProviderToCart(this.state.user);
        swal("Congratulation by adding to cart service provider!", "Your can now proceed with booking by proceding booking link at left hand side", "success")
        console.log(this.props.serviceProvider)
    }


    render() {
        return (
            <div>
                <div id="cm-menu">
                    <nav className="cm-navbar cm-navbar-primary">
                        <div className="cm-flex"><a href="index.html" className="cm-logo"></a></div>
                        <div className="btn btn-primary md-menu-white" data-toggle="cm-menu"></div>
                    </nav>
                    <LeftBar />
                </div>
                <header id="cm-header">
                    <nav className="cm-navbar cm-navbar-primary">
                        <div className="btn btn-primary md-menu-white hidden-md hidden-lg" data-toggle="cm-menu"></div>
                        <div className="cm-flex">
                            <h1>{this.state.username} ( Profile ) </h1>

                        </div>
                        <div className="pull-right">
                            <button className="btn btn-primary sf-gift" onClick={this.addProviderToCart.bind(this)} data-toggle="dropdown"> <span className="label label-danger">0</span> </button>
                        </div>
                    </nav>
                </header>
                <div id="global">
                    <div className="container-fluid cm-container-white">


                    </div>

                    <div className="container-fluid">
                        <div className="row cm-fix-height">
                            <div className="panel panel-default">
                                <div className="panel-body">
                                    <div className=" cm-fix-height">
                                        <div className="col-sm-6">
                                            <div className="panel panel-default">

                                                <div className="panel-body">
                                                    <img src={this.state.user.pic_url} alt="" width="100%" height="100%" className="img img-responsive " />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="panel panel-default">
                                                <div className="panel-heading">Personal informations</div>
                                                <div className="panel-body">
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <b>Firstname</b>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            {this.state.user.first_name}
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <b>Lastname</b>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            {this.state.user.last_name}
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <b>Address</b>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            {this.state.user.address}
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <b>Gender</b>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            {this.state.user.gender}
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <b>Phonenumber</b>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            {this.state.user.phone_number}
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <b>Rates</b>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <i className="glyphicon glyphicon-star-empty"></i>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="panel panel-default">
                                                <div className="panel-heading">Service Offered</div>
                                                <div className="panel-body">
                                                    <div>
                                                        <div className="row">
                                                            <div className="col-sm-4">
                                                                Name
                                                            </div>
                                                            <div className="col-sm-5">
                                                                Descriptions
                                                            </div>
                                                            <div className="col-sm-3">
                                                                Price
                                                            </div>

                                                        </div>
                                                        {this.state.services.map(service => {
                                                            return (
                                                                <div className="row">
                                                                    <div className="col-sm-4">
                                                                        {service.name}
                                                                    </div>
                                                                    <div className="col-sm-5">
                                                                        {service.discriptions}
                                                                    </div>
                                                                    <div className="col-sm-3">
                                                                        {service.price}{service.currency}
                                                                    </div>

                                                                </div>
                                                            )
                                                        })}

                                                    </div>


                                                </div>

                                            </div>

                                            <div className="panel panel-default">
                                                <div className="panel-heading">Personal Descriptions</div>
                                                <div className="panel-body">
                                                    <div className="row">
                                                        {this.state.user.personal_descriptions}
                                                    </div>


                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>



                    </div>


                </div>


            </div>

        );
    }
}
const mapStateToProps = (state, props) => {
    console.log(state.serviceProviderReducer.serviceProviderMc);
    // console.log('State of the navigation reducer: ', state.navigateReducer);

    return {
        serviceProvider: state.serviceProviderReducer.serviceProviderMc

    };
};
const mapActionsToProps = (dispatch, props) => {
    return bindActionCreators({
        addProviderToCart: updateProvider
    }, dispatch);
};


export default connect(mapStateToProps, mapActionsToProps)(Profile);




