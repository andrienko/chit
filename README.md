Wee.js
===

Wee.JS is a tiny js template engine based on [a post by John Resig](http://ejohn.org/blog/javascript-micro-templating/)

It is just a snippet.

Example
---

Just add something like that to header:

    <script type="text/html" id="wee_hello">
      <h1><%= title%></h1>
      <ul>
      <% for ( var i = 0; i < users.length; i++ ) { %>
        <li>Hello, <a href="<%=users[i].url%>"><%=users&#91;i&#93;.name%></a>!</li>
      <% } %>
      </ul>
    </script>

Then call something like

    var data = {
        users:[
            {name: 'John', url:'http://johndoe@site.com'},
            {name: 'Mary', url:'http://marydith@site.com'}
        ],
        title:'User list:'
    };

    wee.render('hello',data);

The template will then be cached and rendered. Render result will be returned/