/**
 * @jsx React.DOM
 */

// makes a list with the result of each call
Sfty.View.mkList = function (items, fn, context, style) {
  return (
    <ul style={style}>
      {items.map(function (e, i) {
        return <li key={i}>{fn.call(context, e, i, items)}</li>;
      })}
    </ul>
  );
};


Sfty.View.header = function (msg, size) {
  return React.DOM['h'+size](null, Sfty.Util.Str.captialize(msg));
};
