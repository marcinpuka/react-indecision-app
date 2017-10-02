class Counter extends React.Component {

    constructor (props) {

        super(props);
        this.handleAddOne = this.handleAddOne.bind(this);
        this.handleMinusOne = this.handleMinusOne.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.state = {
            count: props.count, 
            name: "Julie"
        }
    }

    componentDidMount() {
        
        try {
            const json = localStorage.getItem("count");
            const count = parseInt(JSON.parse(json));
            if (count) {
                this.setState(() => ({ count }));
            }
        } catch (e) {
            //Do nothing at all
        }
    }
        
    componentDidUpdate(prevProps, prevState) {
        if (prevState.count !== this.state.count) {
            const json = JSON.stringify(this.state.count);
            localStorage.setItem("count", json);
        }
    }

    handleAddOne () {
        this.setState((prevState) => {
            return {
                count: prevState.count + 1
            };
        });
    }

    handleMinusOne () {
        this.setState((prevState) => {
            return {
                count: prevState.count -1
            };
        });
    }

    handleReset () {
        this.setState(()=> {
            return {
                count: 0
            };
        });
        // this.setState((prevState)=> {
        //     return {
        //         count: prevState.count + 1
        //     };
        // });
        // this.setState({
        //     count: 0
        // });

        // this.setState({
        //     count: this.state.count + 1
        // });
    }


    render() {
        return (
            <div>
                {this.state.name}
                <h1>Count: {this.state.count}</h1>
                <button onClick={this.handleAddOne}>+1</button>
                <button onClick={this.handleMinusOne}>-1</button>
                <button onClick={this.handleReset}>reset</button>
            </div>
        );
    }
} 

Counter.defaultProps = {
    count: 0
}

ReactDOM.render(<Counter />, document.getElementById("app"));


// let count = 0;
// const addOne = () => {
//   count++; 
//   renderCounterApp();
// };

// const minusOne = () => {
//   count--;
//   renderCounterApp();
// };

// const reset = () => {
//     count = 0;
//     renderCounterApp();
// };

// const appRoot = document.getElementById("app");



// const renderCounterApp = () => {
//     const templateTwo = (
//     <div>
//         <h1>Count: {count} </h1>
//         <button onClick={addOne} className="button">+1</button>
//         <button onClick={minusOne} className="button">-1</button>
//         <button onClick={reset} className="button">Reset</button>
//     </div>
// );

//     // --- RENDER (template, root div) --- //
// ReactDOM.render(templateTwo, appRoot);
    
// };

// renderCounterApp();

