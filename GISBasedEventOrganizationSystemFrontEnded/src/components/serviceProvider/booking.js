import React from 'react';
import LeftBar from '../layouts/leftbar';
import constants from './../../constants/consants';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Axios from 'axios';
import { serviceProviderReducer } from '../../reducers/serviceProviderReducer';
import swal from 'sweetalert';


class Booking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //validations
            disabledSIgin: "disabled",

            errorEmail: '',
            errorRepassword: '',
            errorPhoneNumber: '',
            //validations
            fetchError: false,
            // pageDisplay: 'login',

            pageDisplay: 'login',
            bookingData: {
                event_date: '',
                place: '',
                start_time: '',
                end_time: '',
                service_provider: '',
                service: ''
            },
            firstname: '',
            service_id: '',

            lastname: '',
            email: '',
            phoneNumber: '',
            adderss: '',
            age: '',
            sex: '',
            bank: '',
            repassword: "",
            user: {},
            no_of_booked: 0,
            //login propeties
            loginUserId: 0,
            loginUsername: '',
            loginPassword: ''
        };
    }
    componentWillMount() {
        console.log(this.props.serviceProvider);

        if (this.props.serviceProvider.id !== undefined) {
            this.setState({ no_of_booked: 1 });
        }

    }
    changePageView(page) {
        this.setState({ pageDisplay: page });
    }


    registration() {
        var ur = constants.BASE_URL + 'customer/registration'
        console.log(this.state.firstname);

        Axios.post(ur, {
            first_name: this.state.firstname,
            last_name: this.state.lastname,
            email: this.state.email,
            password: this.state.password,
            phone_number: this.state.phoneNumber,
            address: this.state.adderss,
            sex: this.state.sex,
            age: this.state.age,
            bank: this.state.bank,
            username: this.state.email
        }).then((response) => {
            console.log(response);
            if (response.status == 201) {
                alert('succesful comment')
                this.setState({ open: false });
            }
        }).then().catch((error) => {
            console.log(error);
            alert("failed to login")
        })
    }
    booking(e) {
        e.preventDefault()
        var ur = constants.BASE_URL + 'customer/compliteOrder/' + this.state.loginUserId
        Axios.put(ur, {
            service_provider: this.props.serviceProvider.id,
            service: this.state.service_id,
            event_date: this.state.event_date,
            place: this.state.place,
            start_time: this.state.start_time,
            end_time: this.state.end_time,
            has_payed: true
        }).then((response) => {
            if (response.status == 200) {
                alert("succesfull booking")
            }


        }).then().catch((error) => {
            alert('erro in likes')
        })
    }
    login(e) {
        e.preventDefault()
        var url = constants.BASE_URL + 'customer/login?username=' + this.state.loginUsername + '&password=' + this.state.loginPassword
        Axios.get(url, {

        }).then(
            response => {
                if (response.status == 200) {
                    console.log(response.data);
                    this.setState({ pageDisplay: 'booking', loginUserId: parseInt(response.data) });
                    alert("succesfull login")

                }
            }
        ).catch((error) => {
            alert(error)
        })



    }

    render() {
        return (
            <div>
                <div id="cm-menu">
                    <nav className="cm-navbar cm-navbar-primary">
                        <div className="cm-flex"><a href="index.html" className="cm-logo"></a></div>
                        <div className="btn btn-primary md-menu-white" data-toggle="cm-menu"></div>
                    </nav>
                    <LeftBar active="bok" />
                </div>ss
                <header id="cm-header">
                    <nav className="cm-navbar cm-navbar-primary">
                        <div className="btn btn-primary md-menu-white hidden-md hidden-lg" data-toggle="cm-menu"></div>
                        <div className="cm-flex">
                            <h1>Booking</h1>

                        </div>
                        <div className="pull-right">
                            <button className="btn btn-primary sf-gift" data-toggle="dropdown"> <span className="label label-danger">{this.state.no_of_booked}</span> </button>
                        </div>

                    </nav>
                </header>
                <div id="global">


                    <div className="container-fluid">
                        {(() => {
                            switch (this.state.pageDisplay) {
                                case "login":
                                    return (
                                        <div className="col-sm-10 col-md-10 col-lg-10" style={{ margin: '40px', float: 'none', marginTop: '15%' }}>
                                            <form onSubmit={this.login.bind(this)}>
                                                <div className="col-xs-12">
                                                    <div className="form-group">
                                                        <div className="input-group">
                                                            <div className="input-group-addon"><i className="fa fa-fw fa-user"></i></div>
                                                            <input type="email" required className="form-control" placeholder="email"
                                                                onChange={event => { this.setState({ loginUsername: event.target.value }) }}

                                                            />
                                                        </div>

                                                    </div>

                                                    <div className="form-group">
                                                        <div className="input-group">
                                                            <div className="input-group-addon"><i className="fa fa-fw fa-lock"></i></div>
                                                            <input type="password" required className="form-control" placeholder="Password"
                                                                onChange={event => {
                                                                    var letter = /[a-zA-Z]/;
                                                                    var allLetters = /^[a-zA-Z]+$/;
                                                                    var number = /[0-9]/;
                                                                    this.setState({ loginPassword: event.target.value })
                                                                    if (this.state.loginPassword.length < 4 || !letter.test(this.state.loginPassword) || !number.test(this.state.loginPassword)) {
                                                                        this.setState({
                                                                            errorEmail: "weak password"
                                                                        })
                                                                    }
                                                                    else {
                                                                        this.setState({ errorEmail: "" });
                                                                    }

                                                                }}

                                                            />
                                                        </div>
                                                        <div className="alert-danger">{this.state.errorEmail}</div>
                                                    </div>
                                                </div>
                                                <div className="col-xs-4">
                                                    <div className="checkbox"><label><input type="checkbox" /> Remember me </label></div>
                                                </div>
                                                <div className="col-xs-4">
                                                    <div className="checkbox" onClick={this.changePageView.bind(this, 'register')} ><label> create account ? </label></div>
                                                </div>
                                                <div className="col-xs-4">
                                                    <button type="submit" className="btn btn-block btn-primary" > Sign in</button>
                                                </div>
                                            </form>
                                        </div>

                                    )

                                    break;
                                case "register":
                                    return (
                                        <div className="panel panel-primary " style={{ margin: '40px', float: 'none', marginTop: '5%' }} class="">
                                            <div className="panel-heading btn-success">Personal Informations</div>
                                            <div className="panel-body">
                                                <form >
                                                    <div className="col-xs-12">
                                                        <div className="col-xs-6">
                                                            <div className="form-group">
                                                                <div className="input-group">
                                                                    <div className="input-group-addon"><i className="fa fa-fw fa-user"></i></div>
                                                                    <input type="text" required className="form-control" placeholder="Firstname"
                                                                        onChange={event => { this.setState({ firstname: event.target.value }) }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xs-6">
                                                            {/* <div className="form-group">

                                                                <div className="input-group">
                                                                    <div className="input-group-addon"><i className="fa fa-fw fa-user"></i></div>
                                                                    <select required className="form-control" onChange={event => { this.setState({ bank: event.target.value }) }} >
                                                                        <option value="">Payment bank</option>
                                                                        <option value="crdb">CRDB</option>
                                                                        <option value="nbc">NBC</option>
                                                                        <option value="nmb">NMB</option>
                                                                    </select>


                                                                </div>
                                                            </div> */}
                                                        </div>
                                                    </div>
                                                    <div className="col-xs-12">
                                                        <div className="col-xs-6">
                                                            <div className="form-group">
                                                                <div className="input-group">
                                                                    <div className="input-group-addon"><i className="fa fa-fw fa-user"></i></div>
                                                                    <input type="text" required className="form-control" placeholder="Lastname"
                                                                        onChange={event => { this.setState({ lastname: event.target.value }) }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xs-6">
                                                            <div className="form-group">
                                                                <div className="input-group">
                                                                    <div className="input-group-addon"><i className="fa fa-fw fa-lock"></i></div>
                                                                    <input type="email" required className="form-control" placeholder="Email"
                                                                        onChange={event => { this.setState({ email: event.target.value }) }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-xs-12">
                                                        <div className="col-xs-6">
                                                            <div className="form-group">
                                                                <div className="input-group">
                                                                    <div className="input-group-addon"><i className="fa fa-fw fa-user"></i></div>
                                                                    <input type="number" required className="form-control" placeholder="Age"
                                                                        onChange={event => { this.setState({ age: event.target.value }) }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xs-6">
                                                            <div className="form-group">
                                                                <div className="input-group">
                                                                    <div className="input-group-addon"><i className="fa fa-fw fa-lock"></i></div>
                                                                    <input type="password" required className="form-control" placeholder="Password"
                                                                        onChange={event => { this.setState({ password: event.target.value }) }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-xs-12">
                                                        <div className="col-xs-6">
                                                            <div className="form-group">
                                                                <div className="input-group">
                                                                    <div className="input-group-addon"><i className="fa fa-fw fa-user"></i></div>
                                                                    <select required className="form-control" onChange={event => { this.setState({ sex: event.target.value }) }} >
                                                                        <option value="">Gender</option>
                                                                        <option value="male">Male</option>
                                                                        <option value="female">Female</option>
                                                                    </select>

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xs-6">
                                                            <div className="form-group">
                                                                <div className="input-group">
                                                                    <div className="input-group-addon"><i className="fa fa-fw fa-lock"></i></div>
                                                                    <input type="password" required className="form-control" placeholder="Repassword"
                                                                        onChange={event => { this.setState({ repassword: event.target.value }) }}
                                                                        onBlur={(event) => {
                                                                            if (this.state.password !== this.state.repassword) {
                                                                                this.setState({
                                                                                    errorRepassword: "Passwords Do Not Match"
                                                                                })
                                                                            }


                                                                        }}
                                                                    />
                                                                </div>
                                                                <div className="alert-danger">{this.state.errorRepassword}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-xs-12">
                                                        <div className="col-xs-6">
                                                            <div className="form-group">
                                                                <div className="input-group">
                                                                    <div className="input-group-addon"><i className="fa fa-fw fa-lock"></i></div>
                                                                    <input type="text" required className="form-control" placeholder="Phone number"
                                                                        onChange={event => {
                                                                            this.setState({ phoneNumber: event.target.value })
                                                                            var phoneRe = /^[2-9]\d{2}[2-9]\d{2}\d{4}$/;
                                                                            if (phoneRe.test(this.state.phoneNumber)) {
                                                                                this.setState({ errorPhoneNumber: "should match (+255***********)" });

                                                                            }

                                                                        }}
                                                                    />
                                                                </div>
                                                                <div className="alert-danger">{this.state.errorPhoneNumber}</div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xs-6">
                                                            <div className="form-group">
                                                                <div className="input-group">
                                                                    <div className="input-group-addon"><i className="fa fa-fw fa-lock"></i></div>
                                                                    <input type="text" required className="form-control" placeholder="Address"
                                                                        onChange={event => { this.setState({ adderss: event.target.value }) }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-xs-4">

                                                    </div>
                                                    <div className="col-xs-4">
                                                        <button type="submit" onClick={this.registration.bind(this)} className="btn btn-block btn-primary" > Register</button>
                                                    </div>
                                                    <div className="col-xs-4">

                                                    </div>
                                                </form>
                                            </div>
                                            <div className="panel-footer" onClick={this.changePageView.bind(this, 'login')}>Back</div>
                                        </div>

                                    )
                                    break;
                                case 'booking':
                                    return (
                                        <div className="panel panel-primary " style={{ margin: '40px', float: 'none', marginTop: '5%' }} class="">
                                            <div className="panel-heading btn-success">Booking Informations for {this.props.serviceProvider.first_name} {this.props.serviceProvider.last_name} </div>
                                            <div className="panel-body">
                                                <form onSubmit={this.booking.bind(this)}>
                                                    <div className="col-xs-12">
                                                        <div className="col-xs-6">
                                                            <div className="form-group">
                                                                <label>EventDate</label>
                                                                <div className="input-group">
                                                                    <div className="input-group-addon"><i className="fa fa-fw fa-user"></i></div>
                                                                    <input type="date" required className="form-control" placeholder="EventDate"
                                                                        onChange={event => { this.setState({ event_date: event.target.value }) }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xs-6">
                                                            <div className="form-group">
                                                                <label>Start time</label>
                                                                <div className="input-group">
                                                                    <div className="input-group-addon"><i className="fa fa-fw fa-lock"></i></div>
                                                                    <input type="time" required className="form-control" placeholder="start time"
                                                                        onChange={event => { this.setState({ start_time: event.target.value }) }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-xs-12">
                                                        <div className="col-xs-6">
                                                            <label>End time</label>
                                                            <div className="form-group">
                                                                <div className="input-group">
                                                                    <div className="input-group-addon"><i className="fa fa-fw fa-user"></i></div>
                                                                    <input type="time" required className="form-control" placeholder="end time"
                                                                        onChange={event => { this.setState({ end_time: event.target.value }) }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xs-6">
                                                            <label>Event place</label>
                                                            <div className="form-group">
                                                                <div className="input-group">
                                                                    <div className="input-group-addon"><i className="fa fa-fw fa-user"></i></div>
                                                                    <input type="text" required className="form-control" placeholder="place"
                                                                        onChange={event => { this.setState({ place: event.target.value }) }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div className="col-xs-12">
                                                        <div className="col-xs-6">
                                                            <label>Service to be provided</label>
                                                            <div className="form-group">
                                                                <div className="input-group">
                                                                    <div className="input-group-addon"><i className="fa fa-fw fa-user"></i></div>
                                                                    <select required className="form-control" onChange={event => { this.setState({ service_id: event.target.value }) }} >
                                                                        {this.props.serviceProvider.services.map(x => {
                                                                            return (
                                                                                <option value={x.id}>{x.name} ( price :{x.price})</option>
                                                                            )
                                                                        })}


                                                                    </select>

                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-xs-6">
                                                            <label>Payment bank</label>
                                                            <div className="form-group">
                                                                <div className="input-group">
                                                                    <div className="input-group-addon"><i className="fa fa-fw fa-user"></i></div>
                                                                    <select required className="form-control" onChange={event => { this.setState({ sex: event.target.value }) }} >

                                                                        <option value="crdb">CRDB</option>


                                                                    </select>

                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className="col-xs-4">

                                                    </div>
                                                    <div className="col-xs-4">
                                                        <button type="submit" className="btn btn-block btn-primary" > Confirm booking</button>
                                                    </div>
                                                    <div className="col-xs-4">

                                                    </div>
                                                </form>
                                            </div>
                                            <div className="panel-footer" onClick={this.changePageView.bind(this, 'login')}>Back</div>
                                        </div>

                                    )
                                    break;
                                default:
                                    break;
                            }
                        })()}



                    </div>


                </div>
            </div>
        );
    }
}
const mapStateToProps = (state, props) => {


    // console.log('State of the navigation reducer: ', state.navigateReducer);

    return {
        serviceProvider: state.serviceProviderReducer.serviceProviderMc,


    };
};

export default connect(mapStateToProps, null)(Booking);

