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

app.use(express.static("public"));

app.set("view engine","ejs")

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

app.get("/products",function(req,res){
    var txt_sql = "select * from Nhom6_Order_Product;" + "select * from Nhom6_OrderForm;" + "select * from Nhom6_Customer;" +
        "select * from Nhom6_Product";
    sql.query(txt_sql,function (err,rows){
        if(err){
            res.render("products",{
                dhsp:[],
                dsdh:[],
                dskh:[],
                dssp:[]
            })
        }else{
            res.render("products",{
                dhsp:rows.recordsets[0],
                dsdh:rows.recordsets[1],
                dskh:rows.recordsets[2],
                dssp:rows.recordsets[3]
            })
        }
    })
});

app.get("/search",function (req,res){
    var thamso = req.query.keyword;
    if(thamso==undefined){
        res.render("search",{ds:[]})
    }else{
        var ds = [];
        var txt_sql = "select * from Nhom6_Product where NameProd like '%" + thamso + "%'";
        sql.query(txt_sql,function (err,rows){
            if(err) ds = ["Khong co khach hang nao ca"];
            else ds = rows.recordset;
            res.render("search",{
                ds:ds
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

app.get("/pt-tshirts",function(req,res){
    var txt_sql = "select * from Nhom6_Product where NameProd like 'p.t%shirt%'";
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
    var txt_sql = "select * from Nhom6_Product where NameProd like 'sock%'";
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

