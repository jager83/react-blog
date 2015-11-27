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

    this._currentPage = 1;
    this._itemsPerPage = 10;
    this._order = "ASC";
  }

  componentDidMount() {
    return this.loadPosts();
  }

  set page(val) {
    val = Number(val);

    if(!isNaN(val) && (val > 0)) {
      this._currentPage = val;
    }
  }

  set itemsPerPage(val) {
    val = Number(val);

    if(!isNaN(val) && (val > 0)) {
      this._itemsPerPage = val;
    }
  }

  set orderBy(val) {
    this._order = (val || '').toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
  }

  loadPosts() {
    return $
      .get(API, {
        page : this._currentPage,
        itemsPerPage: this._itemsPerPage,
        orderBy: this._order
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
