import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import uuid from "uuid";

export class ShoppingList extends Component {
  state = {
    items: [{ id: uuid(), name: "Milk" }, { id: uuid(), name: "Egg" }]
  };

  addItem = () => {
    const name = prompt("Enter item");

    if (name) {
      this.setState(state => ({
        items: [
          ...state.items,
          {
            id: uuid(),
            name
          }
        ]
      }));
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
