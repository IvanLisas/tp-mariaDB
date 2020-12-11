package ar.edu.unsam.tpdb.formularios

import ar.edu.unsam.tpdb.database.ConexionMariaDB
import ar.edu.unsam.tpdb.domain.ActionsCount
import ar.edu.unsam.tpdb.domain.Download
import java.sql.PreparedStatement
import java.sql.ResultSet
import java.util.List
import java.text.DecimalFormat

class DownloadQuery {

	ConexionMariaDB cx = new ConexionMariaDB()

	def searchDownloadsOf(int user_id, FilterOrden filtros) {
		var c = cx.conectar();

		var PreparedStatement stmt = null;
		var ResultSet rs = null;

		var List<Download> downloads
		try {
			val query = "select * from (download 
					join file on file.id = download.file_id
 					join action on action.id = download.action_id
					join user on user.id = file.user_id) 
					where download.user_id = " + user_id + filtros.create() + 
					' ORDER BY ' + filtros.orden.column + ' ' + filtros.orden.direction + 
					' limit ' + filtros.limit + ' offset ' + filtros.offset
			println(query)
			stmt = c.prepareStatement(query)
			rs = stmt.executeQuery()
			downloads = new Download().downloadsFactory(rs)
			downloads
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
	}


// Promedio de velocidades de descarga
	def speedAvg(int user_id) {
		var c = cx.conectar();
		var PreparedStatement stmt = null;
		var ResultSet rs = null;
		try {
			val query = "SELECT AVG(speed) FROM download WHERE user_id=" + user_id	
			stmt = c.prepareStatement(query)
			rs = stmt.executeQuery()
			rs.next
			new DecimalFormat("#.##").format(rs.getDouble("AVG(speed)"))
			
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
	}

}
