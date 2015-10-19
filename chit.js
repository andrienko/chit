(function(global) {
    'use strict';

    var prefix = 'chit_';
    var template = {
        cache: {},

        get_function: function (name) {
            this.cache[name] = this.cache[name] || this.generate_function(this.get_body(name));
            return this.cache[name];
        },

        get_body: function (name) {
            return document.getElementById(prefix + name).innerHTML;
        },

        function_text: function(content) {
            return "var p=[];" +
                "with(d){p.push('" +
                content
                    .replace(/[\r\t\n]|\s{1,}/g, " ")
                    .split("<%").join("\t")
                    .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                    .replace(/\t=(.*?)%>/g, "',$1,'")
                    .split("\t").join("');")
                    .split("%>").join("p.push('")
                    .split("\r").join("\\'")
                    .replace(/p\.push\(''\);/g, '')
                + "');}return p.join('');";
        },

        generate_function: function (content) {
            return new Function("d", this.function_text(content));
        }
    };

    global.chit = {
        render: function(template_name,data) {
            return template.get_function(template_name)(data);
        }
    };

})(window);