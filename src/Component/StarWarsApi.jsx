import React, { Component } from 'react';
import characters from '../characters.json';
import {Button, Card} from 'react-bootstrap';
import ls from '../imgs/luke_skywalker.jpg';

class StarWarsApi extends Component{
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }
    componentDidMount(){
        //User selects a character
        let url = characters["characters"][0]["url"];
        fetch(url).then(res => res.json())
        .then(
            result => {
                //selected character film request
                let filmsArray = result["films"];
                for(let i = 0; i < filmsArray.length; i++){
                    fetch(filmsArray[i]).then(res => res.json())
                    .then(result => {
                        this.setState({
                            isLoaded: true,
                            items: result
                        });
                    });
                }
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            error => {
                this.setState({
                    isLoaded: true,
                    error
                });
            });
    }
    render(){
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
          } else if (!isLoaded) {
            return <div>Loading...</div>;
          } else {
            return(
                <div>
                    <Button variant="primary">Luke Skywalker</Button>
                    {console.log(items["title"], items["release_date"])}
                    <p>Hello world</p>
                </div>
                
                // <ul>
                //     {items.map(item => (
                //         <li key={item.name}>
                //         {item.name} {item.price}
                //         </li>
                //     ))}
                // </ul>
            )
        }
    }
}

export default StarWarsApi;