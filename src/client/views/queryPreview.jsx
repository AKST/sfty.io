/**
 * @jsx React.DOM
 */

Sfty.View.QueryPreviewer = React.createClass({

  getDefaultProps: function () {
    return {
      constraints: {},
      comparison: null,
      className: '',
      graph: null,
    };
  },

  withField: function (field, op) {
    var id = function (e) { return e; };
    return new Sfty.Util.Maybe(field)
      .map(op || id)
      .map(Sfty.Util.Str.captialize)
      .otherwise("Not selected");
  },

  render: function () {
    var Header, lookup, makeList, listStyle, header;
   
    Header = Sfty.View.Type.UnderlinedHeader;
    lookup = Sfty.Config.index.bind(Sfty.Config);

    makeList = Sfty.View.mkList;
    header = Sfty.View.header;

    listStyle = {
      'list-style': 'none',
      'padding-left': 0 
    };

    return (
      <section className={this.props.className}>
        <Header size="3" text="Query State"/> 
        {makeList(_.pairs(this.props.constraints), function (pair) {
          return (
            <section>
              {header(Sfty.Config.fields[pair[0]].title, 4)}
              {makeList(pair[1], function (id) {
                return lookup(pair[0], id);
              }, this)}
            </section>
          );
        }, this, listStyle)}
      </section>
    );
  },

});
