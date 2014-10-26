/**
 * @jsx React.DOM
 */


 Sfty.View.Legend = React.createClass({

  propTypes: {
    data: React.PropTypes.arrayOf(React.PropTypes.shape({
      _id: React.PropTypes.number,
      total: React.PropTypes.number,
    })).isRequired,
    category: React.PropTypes.string,
    color: React.PropTypes.func,
  },

  renderRow: function (rowData, index, allElems) {
    var label = Sfty.Config.lookupId({
      id: rowData._id,
      category: this.props.category,
      property: "name",
    });

    var style = { 
      background: "linear-gradient("+this.props.color(index-1).toCSS()+","+this.props.color(index).toCSS()+")",
      backgroundColor: this.props.color(index).toCSS(),
    };

    console.log(style);

    return (
      <tr key={"legend_entry_"+index} className="row">
        <td className="col-md-9 col-sm-8 hide-excess">{label}</td>
        <td className="col-md-2 col-sm-3">{rowData.total}</td>
        <td className="col-md-1 col-sm-1 legend-index" style={style}>{index + 1}</td>
      </tr>
    );
  },

  render: function () {
    var Table = ReactBootstrap.Table;

    return (
      <Table responsive>
        <thead>
          <tr className="row">
            <th className="col-md-9 col-sm-8">Name</th>
            <th className="col-md-2 col-sm-3"><span className="hidden-xs">Value</span></th>
            <th className="col-md-1 col-sm-1">No.</th>
          </tr>
        </thead>
        <tbody>
          {this.props.data.map(this.renderRow)}
        </tbody>
      </Table>
    );
  }

 });
