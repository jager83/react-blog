import React from 'React';
import ReactDOM from 'react-dom';
import Post from "./PostComponent";
import $ from "jquery";

const API = "/posts";

class PostList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
  }

  componentDidMount() {

    $
      .get(API)
      .then(posts => {
        this.setState({posts});
      })
    ;
  }

  render() {
    let items = this.state.posts;

    return (
      <section className="container">
        <hr/>
        <div className="row">
          <div className="col-xs-12">
            {
              items.map((item, index) => <Post key={index + 1} title={item.title} content={item.content} id={item.id}
                                               createdDate={item.createdDate} category={item.category}/>)
            }
          </div>
        </div>
        <hr/>
      </section>
    );
  }
}


ReactDOM.render(
  <PostList />,
  document.getElementById('root')
);
