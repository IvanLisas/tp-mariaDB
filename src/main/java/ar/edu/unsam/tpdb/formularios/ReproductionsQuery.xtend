package ar.edu.unsam.tpdb.formularios
import ar.edu.unsam.tpdb.domain.File
import ar.edu.unsam.tpdb.domain.Category

import java.sql.PreparedStatement
import java.sql.Connection
import ar.edu.unsam.tpdb.database.ConexionMariaDB

class ReproductionsQuery {
 
	Connection c = new ConexionMariaDB().conectar()
	
	def insertFile( File file){
		var PreparedStatement stmt = c.prepareStatement("INSERT INTO file
 		(`title`, `extension_type`, `publish_date`, `type`) 
		VALUES (?, ?, ?, ?)")
		
		stmt.setString(1, file.title)
		stmt.setString(2, file.extension_type)
		stmt.setString(3, file.publish_date.toString)
		stmt.setString(4, file.type)
		stmt.executeUpdate
	}



}