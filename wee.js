console.clear();
var template = {
    cache:{},
    render:function(template_name,data) {
        return this.get_template_function(template_name)(data);
    },
    get_template_function:function(name) {

        if(typeof this.cache[name] == 'undefined') {
            this.cache[name] = this.generate_function(this.get_template_body(name));
        }
        return this.cache[name];
    },
    get_template_body:function(name) {
        return document.getElementById('template_'+name).innerHTML;
    },
    generate_function: function(template_content) {
        var f = "var p=[];" +
            "with(d){p.push('" +
            template_content
                .replace(/[\r\t\n]|\s{2,}/g, " ")
                .split("<%").join("\t")
                .replace(/ {1,}/g,' ')
                .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                .replace(/\t=(.*?)%>/g, "',$1,'")
                .split("\t").join("');")
                .split("%>").join("p.push('")
                .split("\r").join("\\'")
            + "');}return p.join('');";

        f=f.replace(/p\.push\(''\);/g,'');

        console.log(f);

        return new Function("d",f);

    }
};


var data = {
    test:'Hello',
    names:[
        'Jessie',
        'Mark',
        'Peter'
    ]
};

document.body.innerHTML = template.render('test',data);