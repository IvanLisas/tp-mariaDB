package ar.edu.unsam.tpdb.formularios

import java.sql.Connection
import ar.edu.unsam.tpdb.database.ConexionMariaDB
import java.sql.PreparedStatement
import ar.edu.unsam.tpdb.domain.Download
import java.util.List
import java.util.ArrayList
import ar.edu.unsam.tpdb.domain.File
import java.sql.ResultSet

class DownloadQuery {
	ConexionMariaDB cx = new ConexionMariaDB()
	Connection c = cx.conectar()

// Todas las descargas
	def allDownloadsOf(int user_id, String filter) {

		val query = "select * from (download join file on file.id = download.file_id
 					join action on action.id = download.action_id) 
					where download.user_id = " + user_id + filter

		var stmt = c.createStatement()
		val downloadResult = stmt.executeQuery(query)

		new Download().downloadsFactory(downloadResult)
	}



// Promedio
	def averageDownload(int user_id) {
		var stmt = c.createStatement()
		val rs = stmt.executeQuery("SELECT AVG(speed) FROM download WHERE user_id=" + user_id)
		cx.desconectar
		rs.next()
		rs.getDouble("AVG(speed)")
	}

// Filtros
	def downloadsByAscName(int user_id) { allDownloadsOf(user_id, new Filter().byAscFileName) }

	def downloadsByDesName(int user_id) { allDownloadsOf(user_id, new Filter().byDesFileName) }
	
	def searchDownloadsOf(int user_id, String keyword) {
		allDownloadsOf(user_id, new Filter().byFileName(keyword))
	}

}
