import React, { Component } from 'react';
import characters from '../characters.json';
import {Button, Card, Row, Col, Container} from 'react-bootstrap';
import lukeImg from '../imgs/luke_skywalker.jpg';
import obiwan from '../imgs/obi_wan_kenobi.jpg';
import r2_d2 from '../imgs/r2_d2.jpg';

class StarWarsApi extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            isToggleOn: true
        };
        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        this.setState(state => ({
            isToggleOn: !state.isToggleOn
        }));
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
        // if (error) {
        //     return <div>Error: {error.message}</div>;
        //   } else if (!isLoaded) {
        //     return <div>Loading...</div>;
        //   } else {
            return(
                <div>
                    <Button variant="danger" onClick={this.handleClick}>
                        {this.state.isToggleOn ? 'ON' : 'OFF'}
                    </Button>
                    <Container>
                        <Row>
                            <Col>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={lukeImg} />
                                    <Card.Body>
                                        <Card.Title>Luke Skywalker</Card.Title>
                                        <Card.Text>
                                            Some quick example text to build on the card title and make up the bulk of
                                            the card's content.
                                        </Card.Text>
                                        <Button name="luke" variant="primary">View Films</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={obiwan} />
                                    <Card.Body>
                                        <Card.Title>Obi Wan Kenobi</Card.Title>
                                        <Card.Text>
                                            Some quick example text to build on the card title and make up the bulk of
                                            the card's content.
                                        </Card.Text>
                                        <Button variant="primary">View Films</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={r2_d2} />
                                    <Card.Body>
                                        <Card.Title>R2-D2</Card.Title>
                                        <Card.Text>
                                            Some quick example text to build on the card title and make up the bulk of
                                            the card's content.
                                        </Card.Text>
                                        <Button variant="primary">View Films</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                    {console.log(items["title"], items["release_date"])}
                </div>
                
                // <ul>
                //     {items.map(item => (
                //         <li key={item.name}>
                //         {item.name} {item.price}
                //         </li>
                //     ))}
                // </ul>
            )
        // }
    }
}

export default StarWarsApi;