package ar.edu.unsam.tpdb.formularios

import java.sql.Connection
import ar.edu.unsam.tpdb.database.ConexionMariaDB
import java.sql.PreparedStatement
import ar.edu.unsam.tpdb.domain.Download
import java.util.List
import java.util.ArrayList
import ar.edu.unsam.tpdb.domain.File
import java.sql.ResultSet
import ar.edu.unsam.tpdb.domain.Reproduction

class ReproductionQuery {
	// Falta cerrar la conexion
	ConexionMariaDB cx = new ConexionMariaDB()
	Connection c = cx.conectar()

	def searchReproductionOf(int user_id, List<Filtro> filtros) {

		val query = "select * from (reproduction join file on file.id = reproduction.file_id
 					join action on action.id = reproduction.action_id
					inner join user on user.id = file.user_id) 
					where reproduction.user_id = " + user_id + new Filter().create(filtros)

		var stmt = c.createStatement()
		val reproductionResult = stmt.executeQuery(query)
//		cx.desconectar()
		new Reproduction().reproductionsFactory(reproductionResult)

	}

	// CALCULO DEL PROMEDIO DE REPRODUCCIONES POR MES y AÑO
	def CountByMonth(int user_id, String month, String year) {

		val query = "SELECT COUNT(*) FROM (reproduction  
 					JOIN action ON action.id = reproduction.action_id) WHERE
                    MONTH(date_init)=" + month + "AND YEAR(date_init)=" + year

		var stmt = c.createStatement()
		val cantidadReproducciones = stmt.executeQuery(query)

		return cantidadReproducciones
	}

	def countLastYear(int user_id, String date) {

		val query = "select monthname(date_init) as month , year (date_init) as year, count(date_init) as count 
                        from (reproduction join action on action.id = reproduction.action_id) 
                        where date_init > " + date + " - INTERVAL 12 month
                        group by month(date_init), year(date_init)
                        order by max(date_init) asc)"

		var stmt = c.createStatement()
		new ReproductionCount().factory(stmt.executeQuery(query))
	}

	def reproductionAverage(int user_id, String date) {

		val query = "SELECT AVG(count) AS AVERAGE 
            FROM (select monthname(date_init) as month , year (date_init) as year, count(date_init) as count 
            FROM (reproduction join action on action.id = reproduction.action_id) 
            where date_init > " + date + "- INTERVAL 12 month
            group by month(date_init), year(date_init) ) AS newTable;"

		var stmt = c.createStatement()
		val average = stmt.executeQuery(query)
		average

	}
// Filtros
//	def reproductionsByAscName(int user_id) { searchReproductionsOf(user_id, new Filter().byAscFileName) }
//
//	def reproductionsByDesName(int user_id) { searchReproductionsOf(user_id, new Filter().byDesFileName) }
}
