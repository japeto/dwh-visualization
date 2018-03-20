
import json
from flask import jsonify, render_template
# import pandas as pd
from app import app
from models.query_manager import query_manager
import datetime
from flask_cors import cross_origin
import time


@app.route("/")
@cross_origin()
def index():
    return jsonify({'api':'dwh-visualization', 'version':'1.3','year':'2018',
                    'course':'data-mining Spring2018', 'more':'/help'})

@app.route("/promotionsTakeMost/<date_in>/<date_out>")
@cross_origin()
def take_most(date_in, date_out ):
    date_in=datetime.datetime.fromtimestamp(int(date_in) / 1000.0).strftime('%Y-%m-%d')
    date_out=datetime.datetime.fromtimestamp(int(date_out) / 1000.0).strftime('%Y-%m-%d')
    return query_manager("select count(intsales.promotionkey) TotalPorPromocion,  prom.spanishpromotionName"
                         " from factinternetsales as intsales"
                         " join dimpromotion as prom on intsales.promotionKey=prom.promotionKey"
                         " join dimdate as dat on dat.DateKey=intsales.OrderDateKey"
                         " where dat.FullDateAlternateKey BETWEEN '"+date_in+"' and '"+date_out+"' "
                         " group by intsales.promotionkey, prom.spanishpromotionName order by TotalPorPromocion DESC")

@app.route("/promotionsVsProduct/<date_in>/<date_out>")
@cross_origin()
def promo_product(date_in, date_out ):
    date_in=datetime.datetime.fromtimestamp(int(date_in) / 1000.0).strftime('%Y-%m-%d')
    date_out=datetime.datetime.fromtimestamp(int(date_out) / 1000.0).strftime('%Y-%m-%d')
    return query_manager("select sum(intsales.SalesAmount) as sale , prod.SpanishProductName, prom.SpanishPromotionName "
                         "from factinternetsales as intsales "
                         "join dimproduct as prod on intsales.ProductKey=prod.ProductKey "
                         "join dimpromotion as prom on intsales.PromotionKey=prom.PromotionKey "
                         "join dimdate as dat on dat.DateKey=intsales.OrderDateKey "
                         "where dat.FullDateAlternateKey BETWEEN '"+date_in+"' and '"+date_out+"' "
                         "group by intsales.ProductKey, intsales.PromotionKey, prod.SpanishProductName, "
                         "prom.SpanishPromotionName order by sale DESC")

@app.route("/numSalesByYear/<year>")
@cross_origin()
def num_sale_by_year(year ):
    return query_manager("SELECT sum(intsales.SalesAmount) as Ventas, dat.CalendarYear "
                         "FROM factinternetsales as intsales "
                         "join dimdate as dat on intsales.OrderDateKey=dat.DateKey "
                         "where dat.CalendarYear = '"+year+"' group by  dat.CalendarYear")

@app.route("/numSalesByYearN/<year>")
@cross_origin()
def num_sale_by_yearn(year ):
    return query_manager("SELECT sum(intsales.SalesAmount) as sale, dat.CalendarYear FROM factinternetsales as intsales "
                         "join dimdate as dat on intsales.OrderDateKey=dat.DateKey "
                         "where dat.CalendarYear = '"+year+"' OR dat.CalendarYear = '"+str(int(year)-1)+"' OR dat.CalendarYear = '"+str(int(year)+1)+"' "
                         "group by  dat.CalendarYear order by dat.CalendarYear asc;")

@app.route("/volSalesByYear/<year>")
@cross_origin()
def vol_by_year(year ):
    return query_manager("SELECT sum(intsales.SalesAmount) as Ventas, dat.CalendarYear FROM factinternetsales as intsales "
                         "join dimdate as dat on intsales.OrderDateKey=dat.DateKey "
                         "where dat.CalendarYear = '"+year+"' group by  dat.CalendarYear")

@app.route("/internetVsCompany/<year>")
@cross_origin()
def internet_vs_company(year ):
    return query_manager("SELECT sum(fir.SalesAmount)as ventas_internet, sum(frs.SalesAmount) "
                         "as ventas_vendedores, dd.CalendarSemester "
                         "from factinternetsales AS fir JOIN dimdate as dd on "
                         "fir.OrderDateKey = dd.DateKey JOIN factresellersales as frs on frs.OrderDateKey = dd.DateKey "
                         "WHERE dd.CalendarYear = '"+year+"' "
                         "GROUP BY dd.CalendarYear, dd.CalendarSemester")

@app.route("/saleByVol/<date_in>/<date_out>")
@cross_origin()
def sale_by_vol(date_in, date_out ):
    date_in=datetime.datetime.fromtimestamp(int(date_in) / 1000.0).strftime('%Y-%m-%d')
    date_out=datetime.datetime.fromtimestamp(int(date_out) / 1000.0).strftime('%Y-%m-%d')
    return query_manager("select sum(intsales.SalesAmount) as sale , prom.SpanishPromotionName "
                         "from factinternetsales as intsales "
                         "join dimpromotion as prom on intsales.PromotionKey=prom.PromotionKey "
                         "join dimdate as dat on dat.DateKey=intsales.OrderDateKey "
                         "where dat.FullDateAlternateKey BETWEEN '"+date_in+"' and '"+date_out+"' "
                         "group by prom.SpanishPromotionName order by sale DESC")

@app.route("/saleByYear/")
@cross_origin()
def sale_by_year():
    return query_manager("SELECT SUM(fact.SalesAmount) as sale, dat.CalendarYear  from factinternetsales as fact "
                         "JOIN dimdate as dat ON fact.OrderDateKey = dat.DateKey "
                         "group by dat.CalendarYear;")

@app.route("/saleByYearAndMonth/<year>")
@cross_origin()
def sale_by_year_month(year):
    return query_manager("SELECT SUM(fact.SalesAmount) as ventas, dat.MonthNumberOfYear, dat.spanishmonthname from factinternetsales as fact "
                         "JOIN dimdate as dat ON fact.OrderDateKey = dat.DateKey "
                         "where dat.CalendarYear='"+year+"' "
                         "group by dat.MonthNumberOfYear, dat.spanishmonthname")

@app.route("/saleByProductCategories/<date_in>/<date_out>")
@cross_origin()
def sale_by_product_categories(date_in, date_out ):
    date_in=datetime.datetime.fromtimestamp(int(date_in) / 1000.0).strftime('%Y-%m-%d')
    date_out=datetime.datetime.fromtimestamp(int(date_out) / 1000.0).strftime('%Y-%m-%d')
    return query_manager("select sum(intsales.SalesAmount) as sale, cateprod.spanishproductcategoryname "
                         "from factinternetsales as intsales "
                         "join dimdate as dat on dat.DateKey=intsales.OrderDateKey "
                         "join dimproduct as prod on intsales.ProductKey=prod.ProductKey "
                         "join dimproductsubcategory as subcateprod  on prod.ProductSubcategoryKey=subcateprod.ProductSubcategoryKey "
                         "join dimproductcategory as cateprod on subcateprod.ProductCategoryKey=cateprod.ProductCategoryKey "
                         "where dat.FullDateAlternateKey BETWEEN '"+date_in+"' and '"+date_out+"' "
                         "group by cateprod.ProductCategoryKey, cateprod.spanishproductcategoryname")

@app.route("/saleByProductCountry/<date_in>/<date_out>")
@cross_origin()
def sale_by_product_country(date_in, date_out ):
    date_in=datetime.datetime.fromtimestamp(int(date_in) / 1000.0).strftime('%Y-%m-%d')
    date_out=datetime.datetime.fromtimestamp(int(date_out) / 1000.0).strftime('%Y-%m-%d')
    return query_manager("SELECT sum(fact.SalesAmount) as Ventas, dst.SalesTerritoryCountry as pais"
                         " from dimsalesterritory as dst join factinternetsales as fact on fact.SalesTerritoryKey = dst.SalesTerritoryKey "
                         " JOIN dimdate AS dd ON fact.OrderDateKey = dd.DateKey"
                         " WHERE dd.FullDateAlternateKey BETWEEN '"+date_in+"' and '"+date_out+"' "
                         " GROUP BY dst.SalesTerritoryCountry")

@app.route("/currencyBySales/<date_in>/<date_out>")
@cross_origin()
def currency_sales(date_in, date_out ):
    date_in=datetime.datetime.fromtimestamp(int(date_in) / 1000.0).strftime('%Y-%m-%d')
    date_out=datetime.datetime.fromtimestamp(int(date_out) / 1000.0).strftime('%Y-%m-%d')
    return query_manager(" SELECT COUNT( fact.CurrencyKey ) AS totalMoneda, dc.CurrencyName"
                         " FROM factinternetsales AS fact JOIN dimcurrency AS dc ON fact.CurrencyKey = dc.CurrencyKey"
                         " JOIN dimdate AS dd ON fact.OrderDateKey = dd.DateKey"
                         " WHERE dd.FullDateAlternateKey BETWEEN '"+date_in+"' and '"+date_out+"' "
                         " GROUP BY dc.CurrencyName")

@app.route("/products/", methods=['GET'])
@cross_origin()
def products():
    return query_manager("SELECT DISTINCT dp.englishproductname, dp.spanishproductname FROM dimproduct AS dp "
                         " ORDER BY dp.englishproductname")

@app.route("/salesByProductTime/<product_name>/<date_in>/<date_out>")
@cross_origin()
def sales_product_time(product_name, date_in, date_out ):
    date_in=datetime.datetime.fromtimestamp(int(date_in) / 1000.0).strftime('%Y-%m-%d')
    date_out=datetime.datetime.fromtimestamp(int(date_out) / 1000.0).strftime('%Y-%m-%d')
    return query_manager("SELECT SUM( fact.SalesAmount ) as sale, dp.EnglishProductName, dd.SpanishMonthName , dd.monthnumberofyear "
                         "FROM factinternetsales AS fact "
                         "JOIN dimproduct AS dp ON fact.ProductKey = dp.ProductKey "
                         "JOIN dimdate AS dd ON fact.OrderDateKey = dd.DateKey "
                         "WHERE dp.EnglishProductName like '%"+product_name+"%' "
                         "AND dd.FullDateAlternateKey "
                         " BETWEEN '"+date_in+"' and '"+date_out+"' "
                         " GROUP BY dp.EnglishProductName, dd.SpanishMonthName, dd.monthnumberofyear "
                         " ORDER BY dd.monthnumberofyear")


@app.route("/oldProducts/")
@cross_origin()
def old_products():
    return query_manager("SELECT dimproduct.englishproductname AS EnglishName, SUM(factproductinventory.unitsout) AS UnitsSold "
                         "FROM public.factproductinventory, public.dimproduct "
                         "WHERE dimproduct.productkey = factproductinventory.productkey AND factproductinventory.unitsout <> 0"
                         "GROUP BY dimproduct.englishproductname "
                         "ORDER BY UnitsSold desc limit 6;")

@app.route("/inventaryProducts/<quantity>")
@cross_origin()
def inventary_products(quantity):
    return query_manager("SELECT dimproduct.englishproductname AS EnglishName, SUM(factproductinventory.unitsout) AS UnitsSold "
                         "FROM public.factproductinventory, public.dimproduct "
                         "WHERE dimproduct.productkey = factproductinventory.productkey AND factproductinventory.unitsout <> 0"
                         "GROUP BY dimproduct.englishproductname "
                         "ORDER BY UnitsSold desc limit "+quantity+";")

@app.route("/callCenter/")
@cross_origin()
def call_center():
    return query_manager("SELECT wagetype groupday, SUM(calls) AS calls "
                         "FROM public.factcallcenter "
                         "GROUP BY wagetype")

@app.route("/timeZoneCalls/")
@cross_origin()
def shift_weekday():
    return query_manager("SELECT shift as timezone, SUM(calls) AS calls "
                         "FROM public.factcallcenter "
                         "WHERE factcallcenter.wagetype = 'weekday' "
                         "GROUP BY shift")

@app.route("/moneyXCompany/")
@cross_origin()
def money_company():
    return query_manager("SELECT dimdepartmentgroup.departmentgroupname AS departament, SUM(factfinance.amount) AS Presupuesto "
                         "FROM public.dimdepartmentgroup, public.factfinance "
                         "WHERE dimdepartmentgroup.departmentgroupkey = factfinance.departmentgroupkey "
                         "GROUP BY dimdepartmentgroup.departmentgroupname")

@app.route("/moneyMax/")
@cross_origin()
def money_max():
    return query_manager("SELECT da.accountdescription AS description, "
                         "dd.departmentgroupname AS departament, "
                         "SUM(ff.amount) AS amount "
                         "FROM public.factfinance AS ff, public.dimdepartmentgroup AS dd, public.dimaccount AS da "
                         "WHERE dd.departmentgroupkey = ff.departmentgroupkey AND da.accountkey = ff.accountkey "
                         "GROUP BY da.accountdescription, dd.departmentgroupname "
                         "ORDER BY da.accountdescription desc ")

@app.route("/profilePSE/")
@cross_origin()
def profile():
    return query_manager("SELECT da.accountdescription AS DescripcionCuenta, dd.departmentgroupname AS Departamento, SUM(ff.amount) AS Dinero "
                         "FROM public.factfinance AS ff, public.dimdepartmentgroup AS dd, public.dimaccount AS da "
                         "WHERE dd.departmentgroupkey = ff.departmentgroupkey AND da.accountkey = ff.accountkey "
                         "GROUP BY da.accountdescription, dd.departmentgroupname")

@app.route("/all")
@cross_origin()
def all():
    date_in = str(datetime.datetime.now().year-18)+"-"+datetime.datetime.now().strftime('%m-%d')
    date_out = datetime.datetime.now().strftime('%Y-%m-%d')
    year = str(datetime.datetime.now().year)
    month = str(datetime.datetime.now().month)
    out={
        '1': query_manager("select count(intsales.promotionkey) TotalPorPromocion,  prom.spanishpromotionName"
                         " from factinternetsales as intsales"
                         " join dimpromotion as prom on intsales.promotionKey=prom.promotionKey"
                         " join dimdate as dat on dat.DateKey=intsales.OrderDateKey"
                         " where dat.FullDateAlternateKey BETWEEN '"+date_in+"' and '"+date_out+"' "
                         " group by intsales.promotionkey, prom.spanishpromotionName order by TotalPorPromocion DESC"),
        '2': query_manager("select sum(intsales.SalesAmount) as Ventas , prod.SpanishProductName, prom.SpanishPromotionName "
                         "from factinternetsales as intsales "
                         "join dimproduct as prod on intsales.ProductKey=prod.ProductKey "
                         "join dimpromotion as prom on intsales.PromotionKey=prom.PromotionKey "
                         "join dimdate as dat on dat.DateKey=intsales.OrderDateKey "
                         "where dat.FullDateAlternateKey BETWEEN '"+date_in+"' and '"+date_out+"' "
                         "group by intsales.ProductKey, intsales.PromotionKey, prod.SpanishProductName, "
                         "prom.SpanishPromotionName order by Ventas DESC"),
        '3': query_manager("SELECT sum(intsales.SalesAmount) as Ventas, dat.CalendarYear "
                           "FROM factinternetsales as intsales "
                         "join dimdate as dat on intsales.OrderDateKey=dat.DateKey "
                         "where dat.CalendarYear = '"+year+"' group by  dat.CalendarYear"),
        '4': query_manager("SELECT sum(intsales.SalesAmount) as Ventas, dat.CalendarYear FROM factinternetsales as intsales "
                         "join dimdate as dat on intsales.OrderDateKey=dat.DateKey "
                         "where dat.CalendarYear = '"+year+"' group by  dat.CalendarYear"),
        '5': query_manager("SELECT sum(fir.SalesAmount)as ventas_internet, sum(frs.SalesAmount) "
                         "as ventas_vendedores, dd.CalendarSemester "
                         "from factinternetsales AS fir JOIN dimdate as dd on "
                         "fir.OrderDateKey = dd.DateKey JOIN factresellersales as frs on frs.OrderDateKey = dd.DateKey "
                         "WHERE dd.CalendarYear = '"+year+"' "
                         "GROUP BY dd.CalendarYear, dd.CalendarSemester"),
        '6': query_manager("select sum(intsales.SalesAmount) as Ventas , prom.SpanishPromotionName "
                         "from factinternetsales as intsales "
                         "join dimpromotion as prom on intsales.PromotionKey=prom.PromotionKey "
                         "join dimdate as dat on dat.DateKey=intsales.OrderDateKey "
                         "where dat.FullDateAlternateKey BETWEEN '"+date_in+"' and '"+date_out+"' "
                         "group by prom.SpanishPromotionName order by Ventas DESC"),
        # '7': '8': '9':
    }
    return jsonify(out)
    # return out






app.run(debug=False, threaded=True)
