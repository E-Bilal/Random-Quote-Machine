import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false,
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  componentDidMount() {
    fetch("https://api.quotable.io/random")
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          isLoaded: true,
          items: json,
        });
      });
    console.log(this.state);
  }
  render() {
    let { isLoaded, items } = this.state;

    if (!isLoaded) {
      return <div></div>;
    } else {
      return (
        <div className="image">
          <div className="overlay">
            <div className="quotebox">
              <p>{items.content}</p>
              <p>{items.author}</p>
              <button onClick={this.componentDidMount}>New Quote</button>
              <a
                className="twitter-share-button"
                href={`https://twitter.com/intent/tweet?text=${items.content} -${items.author}`}
                target="_blank"
                rel=" noopener noreferrer"
                data-size="large"
              >
                Tweet
              </a>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default App;
