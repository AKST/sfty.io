/**
 * @jsx React.DOM
 */


 Sfty.View.Legend = React.createClass({

  propTypes: {
    data: React.PropTypes.arrayOf(React.PropTypes.shape({
      _id: React.PropTypes.number,
      total: React.PropTypes.number,
    })).isRequired,
    category: React.PropTypes.string
  },

  renderRow: function (rowData, index, allElems) {
    //var label = null;
    var label = Sfty.Config.lookupId({
      id: rowData._id,
      category: this.props.category,
      property: "name",
    });

    return (
      <tr key={"legend_entry_"+index} className="row">
        <td className="col-md-1 col-sm-1">{index + 1}</td>
        <td className="col-md-8 col-sm-8 hide-excess">{label}</td>
        <td className="col-md-3 col-sm-3">{rowData.total}</td>
      </tr>
    );
  },

  render: function () {
    var Table = ReactBootstrap.Table;

    return (
      <Table responsive>
        <thead>
          <tr className="row">
            <th className="col-md-1 col-sm-1">No.</th>
            <th className="col-md-8 col-sm-8">Name</th>
            <th className="col-md-3 col-sm-3">
              <span className="hidden-xs">Value</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {this.props.data.map(this.renderRow)}
        </tbody>
      </Table>
    );
  }

 });