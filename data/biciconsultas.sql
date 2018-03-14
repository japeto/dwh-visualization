--¿Cuáles son las promociones que más toman los clientes?
select count(intsales.promotionkey) TotalPorPromocion,  prom.spanishpromotionName  
from factinternetsales as intsales
join dimpromotion as prom on intsales.promotionKey=prom.promotionKey
join dimdate as dat on dat.DateKey=intsales.OrderDateKey
where dat.FullDateAlternateKey BETWEEN '2005-01-01' and '2014-12-31'
group by intsales.promotionkey, prom.spanishpromotionName order by TotalPorPromocion DESC;

--Comparación de ventas por promoción y producto
select sum(intsales.SalesAmount) as Ventas , prod.SpanishProductName, prom.SpanishPromotionName 
from factinternetsales as intsales 
join dimproduct as prod on intsales.ProductKey=prod.ProductKey 
join dimpromotion as prom on intsales.PromotionKey=prom.PromotionKey 
join dimdate as dat on dat.DateKey=intsales.OrderDateKey
where dat.FullDateAlternateKey BETWEEN '2005-01-01' and '2014-12-31'
group by intsales.ProductKey, intsales.PromotionKey, prod.SpanishProductName, prom.SpanishPromotionName  order by Ventas DESC;

--Numero de ventas por internet en un año determinado
SELECT sum(intsales.SalesAmount) as Ventas, dat.CalendarYear FROM factinternetsales as intsales
join dimdate as dat on intsales.OrderDateKey=dat.DateKey
where dat.CalendarYear = 2011
group by  dat.CalendarYear;

--Volumen de ventas por internet en un año determinado
SELECT sum(intsales.SalesAmount) as volumenVentas, dat.CalendarYear FROM factinternetsales as intsales
join dimdate as dat on intsales.OrderDateKey=dat.DateKey
where dat.CalendarYear = 2011
group by  dat.CalendarYear;


--comparativo entre ventas por Internet y los vendedores de la empresa
SELECT sum(fir.SalesAmount)as ventas_internet, sum(frs.SalesAmount) as ventas_vendedores, dd.CalendarSemester
        from factinternetsales AS fir JOIN dimdate as dd on fir.OrderDateKey = dd.DateKey JOIN factresellersales as frs on frs.OrderDateKey = dd.DateKey
		WHERE dd.CalendarYear = 2012 
        GROUP BY dd.CalendarYear, dd.CalendarSemester 

--¿Cuál es la promoción de ventas por volumen que más prefieren los clientes?
select sum(intsales.SalesAmount) as Ventas , prom.SpanishPromotionName 
from factinternetsales as intsales 
join dimpromotion as prom on intsales.PromotionKey=prom.PromotionKey 
join dimdate as dat on dat.DateKey=intsales.OrderDateKey
where dat.FullDateAlternateKey BETWEEN '2005-01-01' and '2014-12-31'
group by prom.SpanishPromotionName order by Ventas DESC;

--ventas todos los año
SELECT SUM(fact.SalesAmount), dat.CalendarYear  from factinternetsales as fact
JOIN dimdate as dat ON fact.OrderDateKey = dat.DateKey 
group by dat.CalendarYear;

--ventas por mes año y mes determinado
SELECT SUM(fact.SalesAmount), dat.MonthNumberOfYear  from factinternetsales as fact
JOIN dimdate as dat ON fact.OrderDateKey = dat.DateKey 
where dat.CalendarYear=2011 
group by dat.MonthNumberOfYear;

--Total de ventas de productos agrupados por categoría
select sum(intsales.SalesAmount), cateprod.spanishproductcategoryname
        from factinternetsales as intsales
                join dimdate as dat on dat.DateKey=intsales.OrderDateKey 
                join dimproduct as prod on intsales.ProductKey=prod.ProductKey 
                join dimproductsubcategory as subcateprod  on prod.ProductSubcategoryKey=subcateprod.ProductSubcategoryKey
                join dimproductcategory as cateprod on subcateprod.ProductCategoryKey=cateprod.ProductCategoryKey 
        where dat.FullDateAlternateKey BETWEEN  '2012-01-01' AND  '2012-12-31'
        group by cateprod.ProductCategoryKey, cateprod.spanishproductcategoryname

--Total de ventas agrupado por países
SELECT sum(fact.SalesAmount) as totalVentas, dst.SalesTerritoryCountry as pais
        from dimsalesterritory as dst join factinternetsales as fact on fact.SalesTerritoryKey = dst.SalesTerritoryKey 
	JOIN dimdate AS dd ON fact.OrderDateKey = dd.DateKey
        WHERE dd.FullDateAlternateKey BETWEEN  '2013-01-01' AND  '2013-12-31'
        GROUP BY dst.SalesTerritoryCountry
        
--Monedas más usadas por los clientes en las ventas
SELECT COUNT( fact.CurrencyKey ) AS totalMoneda, dc.CurrencyName
        FROM factinternetsales AS fact JOIN dimcurrency AS dc ON fact.CurrencyKey = dc.CurrencyKey
                JOIN dimdate AS dd ON fact.OrderDateKey = dd.DateKey
        WHERE dd.FullDateAlternateKey BETWEEN  '2013-01-01' AND  '2013-12-31'
        GROUP BY dc.CurrencyName
        
--Total de ventas por producto y en el tiempo (por intervalos)
 SELECT SUM( fact.SalesAmount ) , dp.EnglishProductName, dd.SpanishMonthName
FROM factinternetsales AS fact
JOIN dimproduct AS dp ON fact.ProductKey = dp.ProductKey
JOIN dimdate AS dd ON fact.OrderDateKey = dd.DateKey
WHERE dp.EnglishProductName =  'Mountain-100 Silver, 44'
AND dd.FullDateAlternateKey
BETWEEN  '2005-01-01'
AND  '2014-12-31'
GROUP BY dp.EnglishProductName, dd.SpanishMonthName, dd.monthnumberofyear
ORDER BY dd.monthnumberofyear



