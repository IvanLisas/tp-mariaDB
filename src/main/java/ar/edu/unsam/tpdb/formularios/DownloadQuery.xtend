package ar.edu.unsam.tpdb.formularios

import ar.edu.unsam.tpdb.database.ConexionMariaDB
import ar.edu.unsam.tpdb.domain.ActionsCount
import ar.edu.unsam.tpdb.domain.Download
import java.sql.PreparedStatement
import java.sql.ResultSet
import java.util.List

class DownloadQuery {

	ConexionMariaDB cx = new ConexionMariaDB()

	def searchDownloadsOf(int user_id, FilterOrden filtros) {
		var c = cx.conectar();

		var PreparedStatement stmt = null;
		var ResultSet downloadResult = null;

		var List<Download> downloads
		try {
			val query = "select * from (download 
					join file on file.id = download.file_id
 					join action on action.id = download.action_id
					inner join user on user.id = file.user_id) 
					where download.user_id = " + user_id + new Filter().create(filtros.filtros) + ' ORDER BY ' +
				filtros.orden.column + ' ' + filtros.orden.orden
			println(query)
			stmt = c.prepareStatement(query)
			downloadResult = stmt.executeQuery()
			downloads = new Download().downloadsFactory(downloadResult)
			downloads
		} finally {
			if (downloadResult !== null) {
				downloadResult.close();
				println("cerrado")
			}

			if (stmt !== null) {
				stmt.close();
			}
			cx.desconectar(c)
		}
	}

// Promedio de velocidades de descarga
	def speedAvg(int user_id) {
		var c = cx.conectar();
		var PreparedStatement stmt = null;
		var ResultSet rs = null;
		var Double avegare = null
		try {
			rs = stmt.executeQuery("SELECT AVG(speed) FROM download WHERE user_id=" + user_id)
			cx.desconectar(c)
			rs.next()
			avegare = rs.getDouble("AVG(speed)")
		} finally {
			if (rs !== null) {
				rs.close();
				println("cerrado")
			}

			if (stmt !== null) {
				stmt.close();
			}
			cx.desconectar(c)
		}
		avegare
	}
	
	// Calculo de descargas de un mes y año
	def downloadsByDateQuery(int user_id, int month, int year) {
		var c = cx.conectar();
		var PreparedStatement stmt = null;
		var ResultSet countResult = null;
		try {
			val query = 'SELECT COUNT(*) as count FROM (download  
 					JOIN action ON action.id = download.action_id) WHERE
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
	def downloadsLast12MonthsQuery(int user_id) {
		var c = cx.conectar();
		var PreparedStatement stmt = null;
		var ResultSet countResult = null;
		try {
			val query = 'select monthname(date_init) as month , year (date_init) as year, count(date_init) as count 
                        from (download join action on action.id = download.action_id) 
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
	def downloadAverageQuery(int user_id, String action) {
		var c = cx.conectar();
		var PreparedStatement stmt = null;
		var ResultSet averageResult = null;
		try {
			val query = 'SELECT AVG(count) AS average 
            FROM (select monthname(date_init) as month , year (date_init) as year, count(date_init) as count 
            FROM (download join action on action.id = download.action_id) 
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
