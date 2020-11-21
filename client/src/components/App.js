import React from 'react';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      obj: {},
    };
  }

  componentDidMount() {
    fetch('/test')
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          obj: data,
        })
      );
  }

  render() {
    console.log('Render: ', this.state.obj);
    return <div>Hi There</div>;
  }
}

export default App;
