import React from 'React';

class Pagination extends React.Component {

  prevPage() {
    console.log("paginaprev");

  }

  nextPage() {
    console.log("paginanext");
  }

  render() {
    return (
      <article className="row" id={this.props.id}>
        <div className="col-xs-6 text-left">
          <button className="btn btn-primary" onClick={this.prevPage}>prev</button>
        </div>

        <div className="col-xs-6 text-right">
          <button className="btn btn-primary" onClick={this.nextPage}>next</button>
        </div>
      </article>
    );
  }
}

export default Pagination;
