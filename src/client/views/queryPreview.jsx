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
    var Header = Sfty.View.Type.UnderlinedHeader;
    var lookup = Sfty.Config.lookupId.bind(Sfty.Config);

    var makeList = Sfty.View.mkList;
    var header = Sfty.View.header;

    var outtaListStyle = {
      'list-style': 'none',
      'padding-left': 0 
    };

    var innerListStyle = {
      'list-style': 'none',
      'padding-left': '1.5em'
    };

    //
    // 
    //
    var data = _.pairs(this.props.constraints).map(function (pair) {
      var constraint = pair[0];

      var elements = pair[1].map(function (id) {
        var callback = this.props.removeConstraint.bind(null, constraint, id);
        var text = lookup({
          category: constraint,
          property: "name",
          id: id 
        });
        return { 
          text: text, 
          callback: callback 
        };
      }, this);

      return {
        elements: elements,
        constraintT: Sfty.Config.fields[constraint].title,
        constraintK: constraint+"_contraints",
      };
    }, this);

    //
    // Map data out
    //
    return (
      <section id="query-preview" className={this.props.className}>
        <Header size="3" text="Query State"/> 

        {/* constraint category */}

        {makeList(data, function (cs) {
          return (
            <section key={cs.constraintK} className='outer-list-elem'>
              
              {header(cs.constraintT, 4)}

              {/* this is the elements for the constraint */}

              {makeList(cs.elements, function (c){
                return React.DOM.span({ 
                  className: 'inner-list-elem',
                  key: cs.constraintK+"_"+c.id 
                }, [
                  React.DOM.span({
                    className: [
                      "glyphicon",
                      "glyphicon-remove",
                      "remove-constraint-button",
                    ].join(' '),
                    onClick: c.callback
                  }),
                  c.text,
                ]);
              }, null, innerListStyle)}

            </section>
          );
        }, null, outtaListStyle)}
      </section>
    );
  },

});
