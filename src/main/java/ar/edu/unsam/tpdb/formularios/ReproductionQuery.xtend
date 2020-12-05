package ar.edu.unsam.tpdb.formularios

import ar.edu.unsam.tpdb.database.ConexionMariaDB
import ar.edu.unsam.tpdb.domain.Reproduction
import java.sql.PreparedStatement
import java.sql.ResultSet
import java.util.List
import org.eclipse.xtend.lib.annotations.Accessors
import java.util.ArrayList
import ar.edu.unsam.tpdb.domain.Translator

class ReproductionQuery {
	ConexionMariaDB cx = new ConexionMariaDB()

	def searchReproductionOf(int user_id, FilterOrden filtros) {
		var c = cx.conectar();
		var PreparedStatement stmt = null;
		var ResultSet reproductionResult = null;
		var List<Reproduction> reproductions
		try {
			val query = "select * from (reproduction join file on file.id = reproduction.file_id
 					join action on action.id = reproduction.action_id
					inner join user on user.id = file.user_id) 
					where reproduction.user_id = " + user_id + new Filter().create(filtros.filtros) + ' ORDER BY ' +
				filtros.orden.column + ' ' + filtros.orden.orden

			stmt = c.prepareStatement(query)
			reproductionResult = stmt.executeQuery(query)
			reproductions = new Reproduction().reproductionsFactory(reproductionResult)

		} finally {
			if (reproductionResult !== null) {
				reproductionResult.close();
				println("cerrado")
			}

			if (stmt !== null) {
				stmt.close();
			}
			cx.desconectar(c)
		}
		reproductions
	}

	// Calculo de reproducciones de un mes y año
	def reproductionsByDate(int user_id, int month, int year) {
		var c = cx.conectar();
		var PreparedStatement stmt = null;
		var ResultSet countResult = null;
		try {
			val query = 'SELECT COUNT(*) as count FROM (reproduction  
 					JOIN action ON action.id = reproduction.action_id) WHERE
                    MONTH(date_init)="' + month + '" AND YEAR(date_init)="' + year+'"'

			stmt = c.prepareStatement(query)
			countResult = stmt.executeQuery(query)
			countResult.next
			countResult.getDouble("count")

		} finally {
			if (countResult !== null) {
				countResult.close();
				println("cerrado")
			}

			if (stmt !== null) {
				stmt.close();
			}
			cx.desconectar(c)
		}
	}

	//Cantidad de reproducciones por mes de los ultimos 12 meses
	def reproductionsLast12Months(int user_id) {
		var c = cx.conectar();
		var PreparedStatement stmt = null;
		var ResultSet countResult = null;
		var List<Integer> reproductionCount
		try {
			val query = "select monthname(date_init) as month , year (date_init) as year, count(date_init) as count 
                        from (reproduction join action on action.id = reproduction.action_id) 
                        where date_init > now() - INTERVAL 12 month
                        group by month(date_init), year(date_init)
                        order by max(date_init) asc"

			stmt = c.prepareStatement(query)
			countResult = stmt.executeQuery(query)
			while (countResult.next) {
				reproductionCount.add(
					countResult.getInt("count")
				)
			}
			return reproductionCount

		} finally {
			if (countResult !== null) {
				countResult.close();
				println("cerrado")
			}

			if (stmt !== null) {
				stmt.close();
			}
			cx.desconectar(c)
		}
	}

	//Promedio de las reproducciones de los ultimos 12 meses
	def reproductionAverage(int user_id, String date) {
		var c = cx.conectar();
		var PreparedStatement stmt = null;
		var ResultSet averageResult = null;
		try {
			val query = "SELECT AVG(count) AS average 
            FROM (select monthname(date_init) as month , year (date_init) as year, count(date_init) as count 
            FROM (reproduction join action on action.id = reproduction.action_id) 
            where date_init > " + date + "- INTERVAL 12 month
            group by month(date_init), year(date_init) ) AS newTable;"

			stmt = c.prepareStatement(query)
			averageResult = stmt.executeQuery(query)
			averageResult.next
			averageResult.getDouble("average")

		} finally {
			if (averageResult !== null) {
				averageResult.close();
				println("cerrado")
			}

			if (stmt !== null) {
				stmt.close();
			}
			cx.desconectar(c)
		}
	}

}

@Accessors
class ReproductionCount {
	String month
	int count

	def factory(ResultSet reproductionResult) {
		var List<ReproductionCount> reproductionCount = new ArrayList()

		while (reproductionResult.next) {
			reproductionCount.add(new ReproductionCount() => [
				month =  Translator.get.translator(reproductionResult.getString("MONTH"))
				count = reproductionResult.getInt("COUNT")
			])
		}
		reproductionCount
	}
}
