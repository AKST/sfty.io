/**
 * @jsx React.DOM
 */

/**
 * Generates a preview for query
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
            <section>
              {header(Sfty.Config.fields[pair[0]].title, 4)}
              {makeList(pair[1], function (id) {
                return lookup({
                  category: pair[0],
                  property: "name",
                  id: id 
                });
              }, this)}
            </section>
          );
        }, this, listStyle)}
      </section>
    );
  },

});
