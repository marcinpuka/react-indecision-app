class Details extends React.Component {
    constructor (props) {
        super(props);
        this.toggleVisibility = this.toggleVisibility.bind(this);
        this.state = {
            boolVisible: false
        }
    }

    toggleVisibility () {
        this.setState((prevState) => {
            return {
                boolVisible : !prevState.boolVisible
            };
        });
    }

    render () {
        return (
            <div>
                <button onClick={this.toggleVisibility}>
                    {this.state.boolVisible ? "Hide details" : "Show details"}
                </button>
                {this.state.boolVisible && (
                    <Infoscreen />
                )}
            </div>
        );
    }
}

class Infoscreen extends React.Component {

    render () {
        return (
            <div>
                <p> Here comes the news: I love react</p>
            </div>
        );
    };
}

ReactDOM.render(<Details />, document.getElementById("app"));