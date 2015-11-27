import React from 'React';

class Post extends React.Component {

  render() {
    return (
      <article className="row media" id={this.props.id}>
        <div className="col-xs-3">
          <img src="http://static1.squarespace.com/static/536829ece4b010f439613408/t/5508cd85e4b044d9e7790965/1426640263890/mzl.cdpilevy.png?format=original" alt="" className="media-object img-responsive"/>
        </div>

        <div className="col-xs-9">
          <h4>{this.props.title}</h4>
          <p>{this.props.content}</p>
          <p>{this.props.createdDate.toLocaleString()}</p>
          <p>{this.props.category}</p>
        </div>

        <hr/>
      </article>
    );
  }
}

export default Post;
