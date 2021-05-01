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

app.get("/checkout", function(req, res) {
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

app.get("/place-order", function(req, res) {
    console.log("Payment received!");
    req.session.cart = null;
    res.redirect("/");
});

app.get("/add/:id", async function(req, res) {
    var productId = req.params.id;
    var sql_query = "select * from Nhom6_Product where IdProd = " + productId;
    var rs = await sql.query(sql_query);
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    cart.add(rs.recordset, productId);
    req.session.cart = cart;
    res.redirect(req.headers.referer);
})