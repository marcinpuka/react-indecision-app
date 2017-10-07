import React from 'react';
import AddOption from './AddOption';
import Header from './Header';
import Action from './Action';
import Options from './Options';
import OptionModal from './OptionModal';


export default class IndecisionApp extends React.Component {

    state = {
        options: [], 
        selectedOption: undefined
    };

    handleCloseModal = () => {
        this.setState( () => {
            return {
                selectedOption: undefined
            }
        });
    }
 

    handlePick = () => {
        let option = this.state.options[Math.floor(Math.random() * this.state.options.length)];
        this.setState(() => {
            return {
                selectedOption: option
            };
        });
    };

    handleDeleteOptions = () => {
        this.setState(() => {
            return {
                options: []
            };
        });
        // this.setState(() => ({options: []})) 
    };

    handleDeleteOption = (optionToRemove) => {
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => {
                return optionToRemove !== option;
            })
        }));
    };

    handleAddOption = (option) => {
        if (!option) {
            return "Enter valid value to add item";
        } else if (this.state.options.indexOf(option) > -1) {
            return "This option already exists";
        }
        this.setState((prevState) => {
            return {
                options: prevState.options.concat(option)
            };
        });
    };

    componentDidMount() {
        
                try {
                    const json = localStorage.getItem("options");
                    const options = JSON.parse(json);
                    if (options) {
                        this.setState(() => ({ options }));
                    }
                } catch (e) {
                    //Do nothing at all
                }
            }
        
            componentDidUpdate(prevProps, prevState) {
                if (prevState.options.length !== this.state.options.length) {
                    const json = JSON.stringify(this.state.options);
                    localStorage.setItem("options", json);
                }
            }
        
            componentWillUnmount() {
                console.log("componentWillUnmount!");
            }

    render() {
        const subtitle = "Put your life in the hands of a computer";

        return (
            <div>
                <Header subtitle={subtitle} />
                <Action hasOptions={this.state.options.length > 0} handlePick={this.handlePick} should={this.state.should} />
                <Options options={this.state.options} handleDeleteOption={this.handleDeleteOption} handleDeleteOptions={this.handleDeleteOptions} />
                <AddOption handleAddOption={this.handleAddOption} />
                <OptionModal selectedOption={this.state.selectedOption} closeModal={this.handleCloseModal}/>
            </div>
        );
    }
}