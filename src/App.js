import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.getItemsFromApi = this.getItemsFromApi.bind(this);
  }
  componentDidMount() {
    this.getItemsFromApi();
  }

  getItemsFromApi() {
    fetch("https://api.quotable.io/random")
      .then((response) => response.json())
      .then((json) => {
        if (json.length < 240) {
          console.log(json.length);
          this.setState({
            isLoaded: true,
            items: json,
          });
        } else {
          this.getItemsFromApi();
        }
      })
      .catch((err) => console.log(err));
  }

  // hello = () => {
  //   this. => APP class this
  // }

  // hello() {
  //   this. => from caller this
  // }

  render() {
    // deconstruction ES6
    // let { isLoaded, items } = this.state;

    let isLoaded = this.state.isLoaded;
    let items = this.state.items;

    if (!isLoaded) {
      return <div>loading...</div>;
    } else {
      return (
        <div className="image">
          <div className="overlay">
            <div className="quotebox">
              <p className="quotetext">"{items.content}"</p>

              <p className="author">- {items.author}</p>
              <div className="container">
                <a
                  className="twitter"
                  href={`https://twitter.com/intent/tweet?text="${items.content} -${items.author}`}
                  target="_blank"
                  rel=" noopener noreferrer"
                  data-size="large"
                >
                  Tweet
                </a>
                <button className="button" onClick={this.getItemsFromApi}>
                  New Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default App;
