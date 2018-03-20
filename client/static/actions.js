

$("#ex1 ").change(function(){
    var dateFrom= new Date( $("#ex1 ").val() ).getTime();
    var dateTo = new Date( $("#ex2 ").val() ).getTime();
    promotionsTakeMost(dateFrom, dateTo);
});
$("#ex2 ").change(function(){
    var dateFrom= new Date( $("#ex1 ").val() ).getTime();
    var dateTo = new Date( $("#ex2 ").val() ).getTime();
    promotionsTakeMost(dateFrom, dateTo);
});
$("#ex3 ").change(function(){
    var dateFrom= new Date( $("#ex3 ").val() ).getTime();
    var dateTo = new Date( $("#ex4 ").val() ).getTime();
    promotionsVsProduct(dateFrom, dateTo);

});
$("#ex4 ").change(function(){
    var dateFrom= new Date( $("#ex3 ").val() ).getTime();
    var dateTo = new Date( $("#ex4 ").val() ).getTime();
    promotionsVsProduct(dateFrom, dateTo);

});
$("#ex5 ").change(function(){
    var dateFrom= new Date( $("#ex5 ").val() ).getTime();
    var dateTo = new Date( $("#ex6 ").val() ).getTime();
    saleByVol(dateFrom, dateTo);
});
$("#ex6 ").change(function(){
    var dateFrom= new Date( $("#ex5 ").val() ).getTime();
    var dateTo = new Date( $("#ex6 ").val() ).getTime();
    saleByVol(dateFrom, dateTo);
});

$("#ex7 ").change(function(){
    console.log(">>>>>>>> ", $("#ex7 ").val() );
});

$("#ex8 ").change(function(){
    var dateFrom= new Date( $("#ex8 ").val() ).getTime();
    var dateTo = new Date( $("#ex9 ").val() ).getTime();
    saleByProductCategories(dateFrom, dateTo);
});
$("#ex9 ").change(function(){
    var dateFrom= new Date( $("#ex8 ").val() ).getTime();
    var dateTo = new Date( $("#ex9 ").val() ).getTime();
    saleByProductCategories(dateFrom, dateTo);
});

$("#ex10 ").change(function(){
    var dateFrom= new Date( $("#ex10 ").val() ).getTime();
    var dateTo = new Date( $("#ex11 ").val() ).getTime();
    currencyBySales(dateFrom, dateTo);
});
$("#ex11 ").change(function(){
    var dateFrom= new Date( $("#ex10 ").val() ).getTime();
    var dateTo = new Date( $("#ex11 ").val() ).getTime();
    currencyBySales(dateFrom, dateTo);
});

$("#ex12 ").change(function(){
    var dateFrom= new Date( $("#ex12 ").val() ).getTime();
    var dateTo = new Date( $("#ex13 ").val() ).getTime();
    salesByProductTime($("#prodTimeSale ").val(), dateFrom, dateTo);
    console.log(">>>>>>>> ", $("#ex12 ").val() );
});
$("#ex13 ").change(function(){
    var dateFrom= new Date( $("#ex12 ").val() ).getTime();
    var dateTo = new Date( $("#ex13 ").val() ).getTime();
    salesByProductTime($("#prodTimeSale ").val(), dateFrom, dateTo);
    console.log(">>>>>>>> ", $("#ex13 ").val() );
});

$("#ex14 ").change(function(){
    var dateFrom= new Date( $("#ex14 ").val() ).getTime();
    var dateTo = new Date( $("#ex15 ").val() ).getTime();
    saleByProductCountry(dateFrom, dateTo);
});
$("#ex15 ").change(function(){
    var dateFrom= new Date( $("#ex14 ").val() ).getTime();
    var dateTo = new Date( $("#ex15 ").val() ).getTime();
    saleByProductCountry(dateFrom, dateTo);
});


$("#yearVs").change(function(){
    internetVsCompany($("#yearVs").val());
//    console.log(">>>>>>>> ", $("#yearVs ").val() );
});
$("#numProdInve ").change(function(){
    inventaryProducts($("#numProdInve ").val());
//    console.log(">>>>>>>> ", $("#numProdInve ").val() );
});
$("#yearPse ").change(function(){
    numSalesByYear($("#yearPse").val());
    numSalesByYearN($("#yearPse").val());
});


$("#prodTimeSale ").change(function(){
    var dateFrom= new Date( $("#ex12 ").val() ).getTime();
    var dateTo = new Date( $("#ex13 ").val() ).getTime();
    salesByProductTime($("#prodTimeSale ").val(), dateFrom, dateTo);
    console.log(">>>>>>>> ", $("#prodTimeSale ").val() );
});