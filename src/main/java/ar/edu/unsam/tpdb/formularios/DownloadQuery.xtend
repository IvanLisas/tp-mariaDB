package ar.edu.unsam.tpdb.formularios

import java.sql.Connection
import ar.edu.unsam.tpdb.database.ConexionMariaDB
import ar.edu.unsam.tpdb.domain.Download
import java.util.List



class DownloadQuery {
	//Falta cerrar la conexion
	ConexionMariaDB cx = new ConexionMariaDB()
	Connection c = cx.conectar()

// Todas las descargas
	def searchDownloadsOf(int user_id, List<Filtro> filtros) {

		val query = "select * from (download 
					join file on file.id = download.file_id
 					join action on action.id = download.action_id
					inner join user on user.id = file.user_id) 
					where download.user_id = " + user_id +
					new Filter().create(filtros)
					
		println(query)

		var stmt = c.createStatement()
		val downloadResult = stmt.executeQuery(query)
		cx.desconectar()

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
//	def downloadsByAscName(int user_id) { allDownloadsOf(user_id, new Filter().byAscFileName) }
//
//	def downloadsByDesName(int user_id) { allDownloadsOf(user_id, new Filter().byDesFileName) }
//	
//	def searchDownloadsOf(int user_id, List<Filtro> filtros) {
//		allDownloadsOf(user_id, new Filter().create(filtros))
//	}

}
