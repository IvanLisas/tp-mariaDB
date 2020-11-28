package ar.edu.unsam.tpdb.formularios

import ar.edu.unsam.tpdb.domain.File
import ar.edu.unsam.tpdb.domain.Category

import java.sql.PreparedStatement
import java.sql.Connection
import ar.edu.unsam.tpdb.database.ConexionMariaDB
import ar.edu.unsam.tpdb.domain.Reproduction
import java.util.List
import java.util.ArrayList

class ReproductionsQuery {

	Connection c = new ConexionMariaDB().conectar()

	def allReproductionsOf(int id_usuarioLogueado) {

		var PreparedStatement stmt = c.prepareStatement("SELECT * FROM (((reproduction LEFT JOIN 
          file ON file.id = reproduction.file_id )
         LEFT JOIN video ON file.id=video.file_id) 
      LEFT JOIN action ON reproduction.action_id = action.id) 
       WHERE reproduction.user_id = ? ")

		stmt.setInt(1, id_usuarioLogueado)

		val rs = stmt.executeQuery

		var List<Reproduction> reproductions = new ArrayList()
		while (rs.next) {

			val _file = new File() => [
				id = rs.getInt("id")
				title = rs.getString("title")
				extension_type = rs.getString("extension_type")
				type = rs.getString("type")
				publish_date = rs.getString("publish_date")

			]

			reproductions.add(new Reproduction() => [

				os = rs.getString("os")
				file = _file

			])
		}
		reproductions
	}

	def reproductionByAscName(int id_usuarioLogueado) {
		var PreparedStatement stmt = c.prepareStatement("SELECT * FROM (((reproduction LEFT JOIN 
          file ON file.id = reproduction.file_id )
         LEFT JOIN video ON file.id=video.file_id) 
      LEFT JOIN action ON reproduction.action_id = action.id) 
       WHERE reproduction.user_id = ? ORDER BY file.title ASC ")

		stmt.setInt(1, id_usuarioLogueado)

		val rs = stmt.executeQuery

		var List<Reproduction> reproductions = new ArrayList()

		while (rs.next) {

			val _file = new File() => [
				id = rs.getInt("id")
				title = rs.getString("title")
				extension_type = rs.getString("extension_type")
				type = rs.getString("type")
				publish_date = rs.getString("publish_date")
			]
			reproductions.add(new Reproduction() => [
				os = rs.getString("os")
				file = _file

			])
		}
		reproductions
	}

	def reproductionByDesName(int id_usuarioLogueado) {
		var PreparedStatement stmt = c.prepareStatement("SELECT * FROM (((reproduction LEFT JOIN 
          file ON file.id = reproduction.file_id )
         LEFT JOIN video ON file.id=video.file_id) 
      LEFT JOIN action ON reproduction.action_id = action.id) 
       WHERE reproduction.user_id = ? ORDER BY file.title DESC ")

		stmt.setInt(1, id_usuarioLogueado)

		val rs = stmt.executeQuery

		var List<Reproduction> reproductions = new ArrayList()

		while (rs.next) {

			val _file = new File() => [
				id = rs.getInt("id")
				title = rs.getString("title")
				extension_type = rs.getString("extension_type")
				type = rs.getString("type")
				publish_date = rs.getString("publish_date")

			]

			reproductions.add(new Reproduction() => [
//					id = rs.getInt("id")
				os = rs.getString("os")
				file = _file
//					setAction = _action
			])
		}
		reproductions
	}

//	def insertFile( File file){
//		var PreparedStatement stmt = c.prepareStatement("INSERT INTO file
// 		(`title`, `extension_type`, `publish_date`, `type`) 
//		VALUES (?, ?, ?, ?)")
//		
//		stmt.setString(1, file.title)
//		stmt.setString(2, file.extension_type)
//		stmt.setString(3, file.publish_date.toString)
//		stmt.setString(4, file.type)
//		stmt.executeUpdate
//	}
}
