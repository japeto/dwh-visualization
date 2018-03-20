
var PORT = 5000 || process.env.PORT;

$( document ).ready(function() {
    var dateFrom= new Date(2010,01,01).getTime();
    var dateTo = new Date(2014,12,31).getTime();

    promotionsTakeMost(dateFrom, dateTo);
    saleByYear();
    saleByVol(dateFrom, dateTo);
    internetVsCompany($("#yearVs").val());
    promotionsVsProduct(dateFrom, dateTo);
    saleByProductCategories(dateFrom, dateTo);
    inventaryProducts(20);
    currencyBySales(dateFrom, dateTo);
    numSalesByYear(2011);
    numSalesByYearN(2011);
    callCenter();
    saleByProductCountry(dateFrom, dateTo);
    oldProducts();
    moneyXCompany();
    timeZoneCalls();
    products();
    salesByProductTime("AWC Logo Cap",dateFrom, dateTo);
    moneyMax();

});

function promotionsTakeMost(dateFrom, dateTo){
//    console.log('http://127.0.0.1:5000/promotionsTakeMost/'+dateFrom+"/"+dateTo)
    $.ajax({
        url: 'http://127.0.0.1:5000/promotionsTakeMost/'+dateFrom+"/"+dateTo,
        contentType: 'text/plain',
        crossDomain: true,
        success: function(response) {
            dataUp = JSON.parse(response);
            var pos = -1 , total = 0, obj={ "totalporpromocion": 0, "spanishpromotionname": "Base"};
            dataUp.forEach(function(element, index) {
                obj = ((obj.totalporpromocion < element.totalporpromocion)? element: obj)
                pos = ((obj === element)? index: pos)
                total += element.totalporpromocion
            });
            $( "#promoTitle" ).text(obj.spanishpromotionname);
            $( "#nTitle" ).text(obj.spanishpromotionname);
            $( "#promoValue" ).text(obj.totalporpromocion);
            $( "#nValue" ).text(obj.totalporpromocion);
            $( "#promoTotal" ).text("/ "+total);
            delete dataUp[pos];
            dataUp.forEach(function(element, index) {
            $( "#allpromo" ).append(
                    '<div class="pull-left">'+
                    '    <small>'+element.spanishpromotionname+'</small><br/>'+
                    '   <b><span class="bold padding-bottom-7"> '+element.totalporpromocion+' </span> '+
                    '   <small><span>/ '+total+'</span></small> </b>'+
                    '    <div class="pull-left" style="width:180px;">'+
                    '        <div class="progress" style="height:8px; margin:2px 0;">'+
                    '            <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="5" '+
                    '               aria-valuemin="0" aria-valuemax="'+total+'" style="width: '+element.totalporpromocion+'% ">'+
                    '            </div>'+
                    '        </div>'+
                    '    </div>'+
                    '</div>');
            });
        }
    });
}

function saleByYear(){
    $.ajax({
        url: 'http://127.0.0.1:5000/saleByYear/',
        contentType: 'application/json',
        success: function(response) {
            data = JSON.parse(response);

            var x = ['x'], sales = ['Ventas'];
            data.forEach(function(element, index){
                x[index+1] = element.calendaryear;
                sales[index+1] = element.sale;
            });
//            console.log([x, sales])
            var chart = c3.generate({
                bindto: '#chart8',
                data: {
                    x: 'x',
                    columns: [
                        x,
                        sales
                    ]
                },
                axis: {
                    y:{show:false},
                },
                grid: {
                    x: {
                        show: true
                    },
                    y: {
                        show: true
                    }
                }
            });
        }
    });
}

function saleByVol(dateFrom, dateTo){
//    console.log('http://127.0.0.1:5000/saleByVol/'+dateFrom+"/"+dateTo)
    $.ajax({
        url: 'http://127.0.0.1:5000/saleByVol/'+dateFrom+"/"+dateTo,
        contentType: 'application/json',
        success: function(response) {
            data7 = JSON.parse(response);
//            console.log( data7 )
            var pos = -1 , total = 0, obj={ "sale": 0, "spanishpromotionname": "Base"};
            data7.forEach(function(element, index) {
                obj = ((obj.sale < element.sale)? element: obj)
                pos = ((obj === element)? index: pos)
                total += element.sale
            });
            $( "#promoTitle7" ).text(obj.spanishpromotionname);
            $( "#nTitle7" ).text(obj.spanishpromotionname);
            $( "#promoValue7" ).text(obj.sale);
            $( "#nValue7" ).text(obj.sale);
            $( "#promoTotal7" ).text("/ "+total);
            delete data7[pos];
            data7.forEach(function(element, index) {
            $( "#allpromo7" ).append(
                    '<div class="pull-left">'+
                    '    <small>'+element.spanishpromotionname+'</small><br/>'+
                    '   <b><span class="bold padding-bottom-7"> '+element.sale+' </span> '+
                    '   <small><span>/ '+total+'</span></small> </b>'+
                    '    <div class="pull-left" style="width:180px;">'+
                    '        <div class="progress" style="height:8px; margin:2px 0;">'+
                    '            <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="5" '+
                    '               aria-valuemin="0" aria-valuemax="'+total+'" style="width: '+element.sale+'% ">'+
                    '            </div>'+
                    '        </div>'+
                    '    </div>'+
                    '</div>');
            });
        }
    });
}

function internetVsCompany(year){
    $.ajax({
        url: 'http://127.0.0.1:5000/internetVsCompany/'+year,
        contentType: 'application/json',
        success: function(response) {
            data5 = JSON.parse(response);
//            console.log( data5 )
            var months = ['Semestre 1', 'Semestre 2'];
            var pse = ['ventas_internet'], sales = ['ventas_vendedores'];
            data5.forEach(function(element, index){
                pse[index+1] = element.ventas_internet;
                sales[index+1] = element.ventas_vendedores;
            });
            var chart = c3.generate({
                bindto: '#chart5',
              data: {
                columns: [pse, sales],
                type: 'bar',
                groups: [['account1buy', 'account1sell'], ['account2buy', 'account2sell']],
              },
              axis: { x: {
                type: 'category',
                categories: months,
              }},
            });
        }
    });







}

function promotionsVsProduct(dateFrom, dateTo){

    $.ajax({
        url: 'http://127.0.0.1:5000/promotionsVsProduct/'+dateFrom+"/"+dateTo,
        contentType: 'application/json',
        success: function(response) {
//            data2 = response
            data2 = JSON.parse(response);
//            console.log( data2, typeof data2 );
            var chart = c3.generate({
                bindto: '#chart2a',
                data: {
                    type: 'bar',
                    json: data2,
                    keys: {
                        x: 'spanishproductname',
                        value: ['sale']
                    }
                },
                axis: {
                 x: {
                    type: 'category',
                    show:true
                }
            }
            });
            var chart = c3.generate({
                bindto: '#chart2b',
                data: {
                    type: 'bar',
                    json: data2,
                    keys: {
                        x: 'spanishpromotionname',
                        value: ['sale']
                    }
                },
                axis: {
                    x: {
                        type: 'category'
                    }
            }
            });
            var chart = c3.generate({
                bindto: '#chart2c',
                data: {
                    json: data2,
                    keys: {
                        x: 'spanishproductname',
                        value: ['sale']
                    }
                },
                axis: {
                    x: {
                        type: 'category',
                        show:true
                    }
                }
            });

        }
    });
}

function saleByProductCategories(dateFrom, dateTo){
    $.ajax({
        url: 'http://127.0.0.1:5000/saleByProductCategories/'+dateFrom+"/"+dateTo,
        contentType: 'application/json',
        success: function(response) {
            data9 = JSON.parse(response);
            var chart = c3.generate({
                bindto: '#chart9',
                data: {
                    type: 'bar',
                    json: data9,
                    keys: {
                        x: 'spanishproductcategoryname',
                        value: ['sale']
                    },
                    labels:true
                },
                bar: {
                    width: {
                        ratio: 0.5 // this makes bar width 50% of length between ticks
                    }
                },
                axis: {
                        x: {
                            type: 'category'
                        },
                        rotated: true
                }
            });

        }
    });
}

function inventaryProducts(quantity){
    $.ajax({
        url: 'http://127.0.0.1:5000/inventaryProducts/'+quantity,
        contentType: 'application/json',
        success: function(response) {
            data12 = JSON.parse(response);
            var chart = c3.generate({
                bindto: '#chart12',
                data: {
                    type: 'bar',
                    json: data12,
                    keys: {
                        x: 'englishname',
                        value: ['unitssold'],
                    },
                    labels:true
                },
                bar: {
                    width: {
                        ratio: 0.5 // this makes bar width 50% of length between ticks
                    }
                },
                axis: {
                        y:{show:false},
                        x: {
                            type: 'category',
                            show: false,
                            label: {
                                text: 'Scores',
                                position: 'inner-middle'
                            }
                        },
                        y:{
                            show: false
                        },
                        rotated: true
                }
            });
        }
    });
}

function currencyBySales(dateFrom, dateTo){
    $.ajax({
        url: 'http://127.0.0.1:5000/currencyBySales/'+dateFrom+"/"+dateTo,
        contentType: 'application/json',
        success: function(response) {
            data10 = JSON.parse(response);
            var chart = c3.generate({
                bindto: '#chart10',
                data: {
                    type: 'bar',
                    json: data10,
                    keys: {
                        x: 'currencyname',
                        value: ['totalmoneda']
                    },
                    labels:true
                },
                bar: {
                    width: {
                        ratio: 0.5 // this makes bar width 50% of length between ticks
                    }
                },
                axis: {
                        y:{show:false},
                        x: {
                            type: 'category',
                        },
                        rotated: true
                }
            });
        }
    });
}

function numSalesByYear(year){
    $.ajax({
        url: 'http://127.0.0.1:5000/numSalesByYear/'+year,
        contentType: 'application/json',
        success: function(response) {
            chart3a = JSON.parse(response);
            $( "#pseYear" ).text(chart3a[0].calendaryear);
            $( "#pseValue" ).text(chart3a[0].ventas);
        }
    });
}

function numSalesByYearN(year){
    $.ajax({
        url: 'http://127.0.0.1:5000/numSalesByYearN/'+year,
        contentType: 'application/json',
        success: function(response) {
            chart3b = JSON.parse(response);
//            console.log(chart3b)
            var years=[], data3b ={};
            chart3b.forEach(function(element, index){
                data3b[""+element.calendaryear] = element.sale
                years.push(""+element.calendaryear)
            });
            $("#year1").text(year-1);
            $("#year2").text(year+1);
            var chart = c3.generate({
                bindto: '#chart3b',
                data: {
                    json: [data3b],
                    keys: {
                        value: years
                    },
                    type: 'donut'
                },
                tooltip: {
                    format: {
                        value: function (value, ratio, id) {
                            return value+" ventas";
                        }
                    }
                },
                donut: {
                    title: "Otros años",
                    label: {
                        format: function(d, v, i) {
                            return i;
                        }
                    }
                }
            });
        }
    });
}

function callCenter(){
    $.ajax({
        url: 'http://127.0.0.1:5000/callCenter/',
        contentType: 'application/json',
        success: function(response) {
            data = JSON.parse(response);
//            console.log(data)
            data.forEach(function(element){
                if (element.groupday === "weekday"){
                    $("#valWeekday").text(element.calls);
                }else{
                    $("#valHoliday").text(element.calls);
                }
            });
        }
    });
}

function saleByProductCountry(dateFrom, dateTo){
    $.ajax({
        url: 'http://127.0.0.1:5000/saleByProductCountry/'+dateFrom+"/"+dateTo,
        contentType: 'application/json',
        success: function(response) {
            chart13 = JSON.parse(response);
            var chart = c3.generate({
                bindto: '#chart13',
                data: {
                    type: 'bar',
                    json: chart13,
                    keys: {
                        x: 'pais',
                        value: ['ventas']
                    }
                },
                axis: {
                        x: {
                            type: 'category',
            //                show:false
                        }
                }
            });
        }
    });
}

function oldProducts(){
    $.ajax({
        url: 'http://127.0.0.1:5000/oldProducts/',
        contentType: 'application/json',
        success: function(response) {
            data12 = JSON.parse(response);
            if(data12.length > 0){
                $( "#productCant" ).text(data12[0].unitssold);
                $( "#producName" ).text(data12[0].englishname);
                for(var i = 1;i < 6;i++){
                    $("#productlist").append("<li>"+data12[i].englishname
                    +" <br/> <small>Cantidad: "+data12[i].unitssold+"</small> </li>");
                }
            }
        }
    });
}

function moneyXCompany(){
    $.ajax({
        url: 'http://127.0.0.1:5000/moneyXCompany/',
        contentType: 'application/json',
        success: function(response) {
            data16 = JSON.parse(response);
//            console.log(data16)
            var chart = c3.generate({
                bindto: '#chart16',
                data: {
                    type: 'bar',
                    json: data16,
                    keys: {
                        x: 'departament',
                        value: ['presupuesto']
                    }
                },
                axis: {
                    y:{
                        show:false
                    },
                    x: {
                        type: 'category'
                    }
                }
            });
        }
    });
}

function timeZoneCalls(){
    $.ajax({
        url: 'http://127.0.0.1:5000/timeZoneCalls/',
        contentType: 'application/json',
        success: function(response) {
            data14 = JSON.parse(response);
            var cols = [];
            data14.forEach(function(element){
                cols.push([ element.timezone, 0, element.calls, 0]);
            });
            var chart = c3.generate({
                bindto:"#chart15",
                data: {
                    columns: cols,
                    types: {
                        midnight: 'area',
                        AM: 'area-spline',
                        PM1: 'area-spline',
                        PM2: 'area-spline'
                    }
                }
            });
        }
    });
}

function products(){
    $.ajax({
        url: 'http://127.0.0.1:5000/products/',
        contentType: 'application/json',
        success: function(response) {
            data20 = JSON.parse(response);
            data20.forEach(function(element){
                $("#prodTimeSale")
                .append('<option value="' + element.englishproductname + '">' + element.englishproductname + "</option>'");
            });
        }
    });
}

function salesByProductTime(product, dateFrom, dateTo){
   $.ajax({
        url: 'http://127.0.0.1:5000/salesByProductTime/'+product+"/"+dateFrom+"/"+dateTo,
        contentType: 'application/json',
        success: function(response) {
            data11 = JSON.parse(response);
            var months = ['x'], sales = ['Ventas'], months_text = ['x'];
            data11.forEach(function(element){
                months.push(element.monthnumberofyear);
                months_text.push(element.spanishmonthname);
                sales.push(element.sale);
            });
            var chart = c3.generate({
                bindto: '#chart11',
                data: {
                    x: 'x',
                    columns: [
                        months,
                        sales
                    ]
                },
                grid: { x: {show: true}, y: {show: true} }
            });
        }
    });
}

function moneyMax(){
   $.ajax({
        url: 'http://127.0.0.1:5000/moneyMax/',
        contentType: 'application/json',
        success: function(response) {
            data17 = JSON.parse(response);
//            console.log(data17)
            var departaments = [];
            var descriptions = [];
            var json_amounts = {};

            data17.forEach(function(element, index){
                if ( departaments.indexOf(element.departament ) < 0 ){
                    departaments.push(element.departament);
                }
                if ( descriptions.indexOf(element.description) < 0 ){
                    descriptions.push(element.description);
                }

                var key = String(element.departament)+"X"+String(element.description)
                key = key.replace(/\s+/g, '');
                json_amounts[key] = element.amount

            });
            var data17 = [];
            var arr = Object.values(json_amounts);
            descriptions.forEach(function(description, index){
                var line = [];
                line.push( description );
                departaments.forEach(function(departament, index2){
                    var key = String(departament)+"X"+String(description)
                    key = key.replace(/\s+/g, '');
                    line.push( ((typeof json_amounts[key] == "undefined") ? 0 : json_amounts[key] ) )
                });
                data17.push( line );
            });
            var departament = ['Work in Process', 'Warranties', 'Vehicles'];
            var chart = c3.generate({
                bindto: '#chart17',
              data: {
                columns: data17,
                type: 'bar',
              },legend: {
                show: false
              },
              axis: { x: {
                type: 'category',
                categories: departaments,
              }},
            });
        }
    });
}