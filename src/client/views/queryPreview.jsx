/**
 * @jsx React.DOM
 */

/**
 * Generates a preview for query
 */
Sfty.View.QueryPreviewer = React.createClass({

  propTypes: {
    removeConstraint: React.PropTypes.func,
  },

  getDefaultProps: function () {
    return {
      removeConstraint: null,
      constraints: {},
      comparison: null,
      className: '',
      graph: null,
    };
  },

  render: function () {
    var Header, lookup, makeList, listStyle, header;
   
    Header = Sfty.View.Type.UnderlinedHeader;
    lookup = Sfty.Config.lookupId.bind(Sfty.Config);

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
            <section key={pair[0] + "_contraints"}>
              {header(Sfty.Config.fields[pair[0]].title, 4)}
              {makeList(pair[1], function (id) {
                var text = lookup({
                  category: pair[0],
                  property: "name",
                  id: id 
                });
                var callback = this.props.removeConstraint.bind(null, pair[0], id);
                return React.DOM.span({ key: pair[0]+"_contraints_"+id }, [
                  React.DOM.span({
                    className: [
                      "glyphicon",
                      "glyphicon-remove",
                      "remove-constraint-button",
                    ].join(' '),
                    onClick: callback
                  }),
                  text,
                ]);
              }, this, listStyle)}
            </section>
          );
        }, this, listStyle)}
      </section>
    );
  },

});
