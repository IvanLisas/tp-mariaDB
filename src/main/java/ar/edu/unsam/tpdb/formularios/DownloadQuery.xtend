package ar.edu.unsam.tpdb.formularios

import ar.edu.unsam.tpdb.database.ConexionMariaDB
import ar.edu.unsam.tpdb.domain.Download
import java.util.List
import java.sql.PreparedStatement
import java.sql.ResultSet

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

// Promedio
	def averageDownload(int user_id) {
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
}
