import React from 'react';
import { Link } from 'react-router-dom';


class LeftBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            aactiveHome: '',
            aactiveMc: '',
            aactiveDecorators: '',
            aactiveHalls: '',
            aactiveAbout: '',
            activeMusicians: '',
            aactiveRecomandation: '',
            aactiveBooking: ''

        };

    }

    componentDidMount() {
        console.log(this.props.active);
        switch (this.props.active) {
            case "mc":
                this.setState({ aactiveMc: "active" });
                break;
            case "dc":
                this.setState({ aactiveDecorators: 'active' });
                break;
            case 'mus':
                this.setState({ activeMusicians: "active" })
                break;
            case 'hall':
                this.setState({ aactiveHalls: "active" })
                break;
            case 'abt':
                this.setState({ aactiveAbout: "active" })
                break;
            case 'rcm':
                this.setState({ aactiveRecomandation: "active" })
                break;
            case 'bok':
                this.setState({ aactiveBooking: "active" })
                break;
            default:
                this.setState({ aactiveHome: 'active' });

                break;
        }

    }
    render() {
        return (
            <div id="cm-menu-content">
                <div id="cm-menu-items-wrapper">
                    <div id="cm-menu-scroller">
                        <ul className="cm-menu-items">
                            <li className={this.state.aactiveHome}><Link to={'/'} className="sf-house">Home</Link></li>
                            <li className={this.state.aactiveMc}><Link to={'/master_of_ceremony'} className="sf-user-male-alt">Master's of ceremony</Link></li>
                            <li className={this.state.aactiveDecorators}><Link to={'/decorators'} className="sf-shop">Decorators</Link></li>
                            <li className={this.state.aactiveHalls}><Link to={'/halls'} className=" sf-user-male">Halls</Link></li>
                            <li className={this.state.activeMusicians}><Link to={'/musicians'} className="sf-bullhorn">Muscian's</Link></li>
                            <li className={this.state.aactiveRecomandation}><Link to={'/recomadation'} className="sf-wrench-screwdriver">Recomandation</Link></li>
                            <li className={this.state.aactiveBooking}><Link to={'/booking'} className=" sf-basket">Booking</Link></li>
                            <li className={this.state.aactiveAbout}><Link to={'/about'} className="sf-light-bulb">About</Link></li>


                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}



export default LeftBar;
