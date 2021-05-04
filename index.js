const e = require("express");
const express = require("express");
const app = express();
const port = process.env.PORT || 5050;

app.listen(port,function (){
    console.log("server is running...");
});
const mssql = require("mssql");
const config = {
    server:"118.70.125.210",
    user:"sa",
    password:"z@GH7ytQ",
    database:"QuangHoa"
};
mssql.connect(config,function (err){
    if(err) console.log(err);
    else console.log("Ket noi database thanh cong!");
});

const sql = new mssql.Request();
var session = require('express-session');
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
  }));
app.use(express.static("public"));

app.set("view engine","ejs")

var Cart = require("./cart");
const validator = require('validator');
const bp = require('body-parser');

app.use(bp.json());
app.use(bp.urlencoded({extended : true}))

app.get("/",function(req,res){
    var txt_sql = "";
    sql.query(txt_sql,function (err,rows){
        if(err){
            res.render("home",{})
        }else{
            res.render("home",{})
        }
    })
});

app.get("/contact",function(req,res){
    var txt_sql = "";
    sql.query(txt_sql,function (err,rows){
        if(err){
            res.render("contact",{})
        }else{
            res.render("contact",{})
        }
    })
});

app.get("/aboutus",function(req,res){
    var txt_sql = "";
    sql.query(txt_sql,function (err,rows){
        if(err){
            res.render("aboutus",{})
        }else{
            res.render("aboutus",{})
        }
    })
});

app.get("/products",function(req,res){
    var txt_sql = "select * from Nhom6_Product;"
    sql.query(txt_sql,function (err,rows){
        if(err){
            res.render("products",{
                dssp:[]
            })
        }else{
            res.render("products",{
                dssp:rows.recordset
            })
        }
    })
});

app.get("/search",function (req,res){
    var thamso = req.query.keyword;
    if(thamso==undefined){
        res.render("search",{dssp:[]})
    }else{
        var dssp = [];
        var txt_sql = "select * from Nhom6_Product where NameProd like '%" + thamso + "%'";
        sql.query(txt_sql,function (err,rows){
            if(err) dssp = [""];
            else dssp = rows.recordset;
            res.render("search",{
                dssp:dssp
            });
        });
    }
})

app.get("/shirts",function(req,res){
    var txt_sql = "select * from Nhom6_Product where NameProd like 'shirt%'";
    sql.query(txt_sql,function (err,rows){
        if(err){
            res.render("shirts",{
                dssp:[]
            })
        }else{
            res.render("shirts",{
                dssp:rows.recordset
            })
        }
    })
});

app.get("/skirts",function(req,res){
    var txt_sql = "select * from Nhom6_Product where NameProd like 'skirt%'";
    sql.query(txt_sql,function (err,rows){
        if(err){
            res.render("skirts",{
                dssp:[]
            })
        }else{
            res.render("skirts",{
                dssp:rows.recordset
            })
        }
    })
});

app.get("/frocks",function(req,res){
    var txt_sql = "select * from Nhom6_Product where NameProd like 'frock%'";
    sql.query(txt_sql,function (err,rows){
        if(err){
            res.render("frocks",{
                dssp:[]
            })
        }else{
            res.render("frocks",{
                dssp:rows.recordset
            })
        }
    })
});

app.get("/pt",function(req,res){
    var txt_sql = "select * from Nhom6_Product where NameProd like '%p.t%'";
    sql.query(txt_sql,function (err,rows){
        if(err){
            res.render("pt",{
                dssp:[]
            })
        }else{
            res.render("pt",{
                dssp:rows.recordset
            })
        }
    })
});

app.get("/pt-tshirts",function(req,res){
    var txt_sql = "select * from Nhom6_Product where NameProd like '%t-shirt%'";
    sql.query(txt_sql,function (err,rows){
        if(err){
            res.render("pt-tshirts",{
                dssp:[]
            })
        }else{
            res.render("pt-tshirts",{
                dssp:rows.recordset
            })
        }
    })
});

app.get("/pt-shorts",function(req,res){
    var txt_sql = "select * from Nhom6_Product where NameProd like '%short%'";
    sql.query(txt_sql,function (err,rows){
        if(err){
            res.render("pt-shorts",{
                dssp:[]
            })
        }else{
            res.render("pt-shorts",{
                dssp:rows.recordset
            })
        }
    })
});

app.get("/pt-trackpants",function(req,res){
    var txt_sql = "select * from Nhom6_Product where NameProd like '%pant%'";
    sql.query(txt_sql,function (err,rows){
        if(err){
            res.render("pt-trackpants",{
                dssp:[]
            })
        }else{
            res.render("pt-trackpants",{
                dssp:rows.recordset
            })
        }
    })
});

app.get("/belts",function(req,res){
    var txt_sql = "select * from Nhom6_Product where NameProd like 'belt%'";
    sql.query(txt_sql,function (err,rows){
        if(err){
            res.render("belts",{
                dssp:[]
            })
        }else{
            res.render("belts",{
                dssp:rows.recordset
            })
        }
    })
});

app.get("/socks",function(req,res){
    var txt_sql = "select * from Nhom6_Product where NameProd like 'socks%'";
    sql.query(txt_sql,function (err,rows){
        if(err){
            res.render("socks",{
                dssp:[]
            })
        }else{
            res.render("socks",{
                dssp:rows.recordset
            })
        }
    })
});
app.get("/ties",function(req,res){
    var txt_sql = "select * from Nhom6_Product where NameProd like 'tie%'";
    sql.query(txt_sql,function (err,rows){
        if(err){
            res.render("ties",{
                dssp:[]
            })
        }else{
            res.render("ties",{
                dssp:rows.recordset
            })
        }
    })
});

app.get("/detailproduct", async function (req,res){
    var name = req.query.NameProd;
    var name2 = name.split(" ")[0];
    var txt_sql1 = "SELECT Top 5 * from Nhom6_Product where NameProd like "+name2+"%' ORDER BY NEWID()";
    var kq1 = await sql.query(txt_sql1);
    var gp = kq1.recordset;
    var txt_sql2 = "select * from Nhom6_Product where NameProd like"+name;
    var kq2 = await sql.query(txt_sql2);
    res.render("detailproduct",{
        gp:gp,
        sp:kq2.recordset
    })
})

app.get("/cart", function(req, res) {
    if(!req.session.cart) {
        return res.render("checkout", {
            products: null,
            totalPrice: 0
        })
    }
    var cart = new Cart(req.session.cart);
    res.render("checkout", {
        products: cart.getItems(),
        totalPrice: cart.totalPrice
    })
});

app.get("/add/:id", async function(req, res) {
    var productId = req.params.id;
    var sql_query = "select * from Nhom6_Product where IdProd = " + productId;
    var rs = await sql.query(sql_query);
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.add(rs.recordset, productId);
    req.session.cart = cart;
    res.redirect(req.headers.referer);
});

app.get("/remove/:id", function(req, res) {
    var prodId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.remove(prodId);
    res.redirect(req.headers.referer);
});


app.get('/billing-shipping', (req, res, next) => {
    res.render('billing-shipping', {
        title: 'Billing and shipping',
        section: 'billing'
    });

});

app.get('/payment', (req, res, next) => {

    const billing = req.session.billing;
    const shipping = req.session.shipping;
    var cart = new Cart(req.session.cart);
    if(!billing) {
        res.redirect('/billing-shipping');
        return;
    }

    res.render('payment', {
        title: 'Payment',
        section: 'payment',
        billing,
        shipping,
        products : cart.getItems()
    });
});

app.get('/thank-you', (req, res, next) => {
    if(req.session.billing) {
        res.render('thank-you', {
            title: 'Order complete',
            section: 'thank-you',
            billing: req.session.billing
        });
    } else {
        res.redirect('/checkout');
    }
});

app.get('/back-home', (req, res, next) => {
    req.session.destroy();
    res.redirect("/");
});

app.post('/billing-shipping', (req, res, next) => {
    const post = req.body;
    const errors = [];

    if(validator.isEmpty(post.billing_first_name)) {
        errors.push({
            param: 'billing_first_name',
            msg: 'Required field.'
        });
    }
    if(validator.isEmpty(post.billing_last_name)) {
        errors.push({
            param: 'billing_last_name',
            msg: 'Required field.'
        });
    }
    if(!validator.isEmail(post.billing_email)) {
        errors.push({
            param: 'billing_email',
            msg: 'Invalid e-mail address.'
        });
    }

    if(validator.isEmpty(post.billing_address)) {
        errors.push({
            param: 'billing_address',
            msg: 'Required field.'
        });
    }

    if(validator.isEmpty(post.billing_city)) {
        errors.push({
            param: 'billing_city',
            msg: 'Required field.'
        });
    }

    if(!validator.isNumeric(post.billing_zip)) {
        errors.push({
            param: 'billing_zip',
            msg: 'Invalid postal code.'
        });
    }

    if(!post.same_as) {
        if(validator.isEmpty(post.shipping_first_name)) {
            errors.push({
                param: 'shipping_first_name',
                msg: 'Required field.'
            });
        }
        if(validator.isEmpty(post.shipping_last_name)) {
            errors.push({
                param: 'shipping_last_name',
                msg: 'Required field.'
            });
        }
        if(!validator.isEmail(post.shipping_email)) {
            errors.push({
                param: 'shipping_email',
                msg: 'Invalid e-mail address.'
            });
        }

        if(validator.isEmpty(post.shipping_address)) {
            errors.push({
                param: 'shipping_address',
                msg: 'Required field.'
            });
        }

        if(validator.isEmpty(post.shipping_city)) {
            errors.push({
                param: 'shipping_city',
                msg: 'Required field.'
            });
        }

        if(!validator.isNumeric(post.shipping_zip)) {
            errors.push({
                param: 'shipping_zip',
                msg: 'Invalid postal code.'
            });
        }
    }

    if(errors.length > 0) {
        res.json({ errors });
    } else {
        const billing = {};


        for(let prop in post) {
            if(prop.startsWith('billing')) {
                let key = prop.replace('billing', '').replace(/_/g, '');
                billing[key] = post[prop];
            }
        }

        req.session.billing = billing;

        if(!post.same_as) {
            const shipping = {};

            for(let prop in post) {
                if(prop.startsWith('shipping')) {
                    let key = prop.replace('shipping', '').replace(/_/g, '');
                    shipping[key] = post[prop];
                }
            }

            req.session.shipping = shipping;
        }

        res.json({ saved: true });
    }
});