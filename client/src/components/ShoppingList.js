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
    axios
      .get("http://localhost:5000/api/items")
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
      axios
        .post("http://localhost:5000/api/items", { name } )
        .then(res => console.log(res.data))
        .catch(err => console.log(err));

        window.location = '/';
    }
  };

  deleteItem = id => {
    console.log(id);
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
            {items.map(({ _id, name }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={() => this.deleteItem(_id)}
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
