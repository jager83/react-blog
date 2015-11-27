import React from 'React';
import ReactDOM from 'react-dom';
import Post from "./PostComponent";
import Pagination from "./PaginationComponent";
import $ from "jquery";

const API = "/posts";

class PostList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };

    this.currentPage = 1;
    this.itemsPerPage = 10;
    this.order = "ASC";
  }

  componentDidMount() {
    return this.loadPosts();
  }

  loadPosts() {
    return $
      .get(API, {
        page : this.currentPage,
        itemsPerPage: this.itemsPerPage,
        orderBy: this.order
      })
      .then(posts => {
        this.setState({posts});
      })
    ;
  }

  render() {
    let items = this.state.posts;

    return (
      <section className="container">
        <Pagination />
        <hr/>
        <div className="row">
          <div className="col-xs-12">
            {
              items.map((item, index) => <Post key={index + 1} title={item.title} content={item.content} id={item.id}
                      createdDate={item.createdDate} category={item.category} />)
            }
          </div>
        </div>
        <hr/>
        <Pagination />
      </section>
    );
  }
}


ReactDOM.render(
  <PostList />,
  document.getElementById('root')
);
