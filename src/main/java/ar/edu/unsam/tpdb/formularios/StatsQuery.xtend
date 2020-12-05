package ar.edu.unsam.tpdb.formularios

import ar.edu.unsam.tpdb.database.ConexionMariaDB
import ar.edu.unsam.tpdb.domain.ActionsCount
import java.sql.PreparedStatement
import java.sql.ResultSet

class StatsQuery {

	ConexionMariaDB cx = new ConexionMariaDB()

	// Calculo de descargas de un mes y año
	def actionsByDate(int user_id, int month, int year, String action) {
		var c = cx.conectar();
		var PreparedStatement stmt = null;
		var ResultSet countResult = null;
		try {
			val query = 'SELECT COUNT(*) as count FROM ("' + action + '"  
 					JOIN action ON action.id = "' + action + '".action_id) WHERE
                    MONTH(date_init)="' + month + '" AND YEAR(date_init)="' + year + '"'

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

	// Cantidad de descargas por mes de los ultimos 12 meses
	def actionsLast12Months(int user_id, String action) {
		var c = cx.conectar();
		var PreparedStatement stmt = null;
		var ResultSet countResult = null;
		try {
			val query = 'select monthname(date_init) as month , year (date_init) as year, count(date_init) as count 
                        from ("' + action + '" join action on action.id = "' + action + '".action_id) 
                        where date_init > now() - INTERVAL 12 month
                        group by month(date_init), year(date_init)
                        order by max(date_init) asc'

			stmt = c.prepareStatement(query)
			countResult = stmt.executeQuery(query)
			return new ActionsCount().factory(countResult)

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

	// Promedio de las descargas de los ultimos 12 meses
	def actionsAverage(int user_id, String action) {
		var c = cx.conectar();
		var PreparedStatement stmt = null;
		var ResultSet averageResult = null;
		try {
			val query = 'SELECT AVG(count) AS average 
            FROM (select monthname(date_init) as month , year (date_init) as year, count(date_init) as count 
            FROM ("' + action + '" join action on action.id = "' + action + '".action_id) 
            where date_init > now() - INTERVAL 12 month
            group by month(date_init), year(date_init) ) AS newTable;'

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
