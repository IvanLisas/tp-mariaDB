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
	Connection c = new ConexionMariaDB().conectar()

// Todas las descargas
	def allDownloadsOf(int user_id, String filter) {

		val query = "select * from (download join file on file.id = download.file_id
 					join action on action.id = download.action_id) 
					where download.user_id = " + user_id + filter

		downloadsFactory(query)
	}

// Busqueda -No anda-
	def searchDownloadsOf(int user_id, String keyword) {
		println(keyword)
		allDownloadsOf(user_id, ' and file.title like "%' + keyword + '%" or file.extension_type like "%' + keyword + '%"')
	}

	// Promedio
	def averageDownload(int user_id) {
		var stmt = c.createStatement()
		val rs = stmt.executeQuery("SELECT AVG(speed) FROM download WHERE user_id=" + user_id)
		rs.next()
		rs.getDouble("AVG(speed)")
	}

	// Filtros
	def downloadsByAscName(int user_id) { allDownloadsOf(user_id, ' ORDER BY file.title ASC') }

	def downloadsByDesName(int user_id) { allDownloadsOf(user_id, ' ORDER BY file.title DESC') }

	// Factory'
	def downloadsFactory(String query) {
		var List<Download> downloads = new ArrayList()

		var stmt = c.createStatement()
		val downloadResult = stmt.executeQuery(query)

		while (downloadResult.next) {
			val _file = new File() => [
				id = downloadResult.getInt("file.id")
				title = downloadResult.getString("title")
				extension_type = downloadResult.getString("extension_type")
				type = downloadResult.getString("type")
				publish_date = downloadResult.getString("publish_date")
			]

			var PreparedStatement categoryStmt = c.prepareStatement("SELECT description FROM category WHERE id IN (SELECT category_id 
        		FROM category_has_archive c WHERE c.file_id = " + _file.id + " )")

			val categoryResult = categoryStmt.executeQuery

			while (categoryResult.next) {
				_file.categories.add(categoryResult.getString("description"))
			}

			downloads.add(new Download() => [
				download_id = downloadResult.getInt("download.id")
				speed = downloadResult.getDouble("speed")
				action_id = downloadResult.getInt("action.id")
				date_init = downloadResult.getString("date_init")
				file = _file
			])
		}
		downloads
	}

}
