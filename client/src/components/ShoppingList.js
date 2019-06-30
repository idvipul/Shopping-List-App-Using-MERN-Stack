import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import axios from "axios";

export class ShoppingList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    };
  }

  componentDidMount() {
      axios.get('api/items')
        .then(res => {
            this.setState({
                items: res.data
            });
        })
        .catch(err => console.log("Error: " + err));
  }

  addItem = () => {
    const name = prompt("Enter item");

    if (name) {
        axios.post('/api/items', name)
            // .then(res => console.log(res.data))
            .then(this.setState(state => ({
                items: [...state.items, { name } ]
            })))
            .catch(err => console.log(err))
    }
  };

  deleteItem = id => {
    this.setState(state => ({
      items: state.items.filter(item => item.id !== id)
    }));
  };

  render() {
    const { items } = this.state;
    return (
      <Container>
        <Button
          color="dark"
          margin={{ marginBottom: "2rem" }}
          onClick={this.addItem}
        >
          Add Item{" "}
        </Button>

        <ListGroup>
          <br />
          <TransitionGroup className="shopping-list">
            {items.map(({ id, name }) => (
              <CSSTransition key={id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={() => this.deleteItem(id)}
                  >
                    &times;
                  </Button>
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

export default ShoppingList;
