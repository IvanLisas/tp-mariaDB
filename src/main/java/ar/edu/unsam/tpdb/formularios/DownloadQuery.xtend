package ar.edu.unsam.tpdb.formularios

import java.sql.Connection
import ar.edu.unsam.tpdb.database.ConexionMariaDB
import ar.edu.unsam.tpdb.domain.Download
import java.util.List
import java.sql.PreparedStatement
import java.beans.Statement
import java.sql.ResultSet
import java.util.ArrayList

class DownloadQuery {
	// Falta cerrar la conexion
	ConexionMariaDB cx = new ConexionMariaDB()

//	Connection c = cx.conectar()
// Todas las descargas
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
					where download.user_id = " + user_id + new Filter().create(filtros.filtros) +
					' ORDER BY '+ filtros.orden.column + ' ' + filtros.orden.orden

			println(query)

			stmt = c.prepareStatement(query)
			downloadResult = stmt.executeQuery()
			downloads = new Download().downloadsFactory(downloadResult)

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
		downloads
	}

// Promedio

//	def averageDownload(int user_id) {
//		var stmt = c.createStatement()
//		val rs = stmt.executeQuery("SELECT AVG(speed) FROM download WHERE user_id=" + user_id)
//		cx.desconectar(c)
//		rs.next()
//		rs.getDouble("AVG(speed)")
//	}

	


// Filtros
//	def downloadsByAscName(int user_id) { allDownloadsOf(user_id, new Filter().byAscFileName) }
//
//	def downloadsByDesName(int user_id) { allDownloadsOf(user_id, new Filter().byDesFileName) }
//	
//	def searchDownloadsOf(int user_id, List<Filtro> filtros) {
//		allDownloadsOf(user_id, new Filter().create(filtros))
//	}
}
