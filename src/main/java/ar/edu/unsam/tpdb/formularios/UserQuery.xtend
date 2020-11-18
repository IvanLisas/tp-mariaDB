package ar.edu.unsam.tpdb.formularios

import ar.edu.unsam.tpdb.database.ConexionMariaDB
import ar.edu.unsam.tpdb.domain.User
import java.sql.PreparedStatement
import java.sql.Connection
import java.sql.Statement

class UserQuery {
	

	Connection c = new ConexionMariaDB().conectar()
	
	def insertUser(User user){
		var PreparedStatement stmt = c.prepareStatement("INSERT INTO user
 		(`name`, `surname`, `username`, `password`, `dni`, `email`) 
		VALUES (?, ?, ?, ?, ?, ?)")
	
		stmt.setString(1, user.name)
		stmt.setString(2, user.surname)
		stmt.setString(3, user.username)
		stmt.setString(4, user.password)
		stmt.setInt(5, user.dni)
		stmt.setString(6, user.email)
		stmt.executeUpdate
	}
	
	def loginUser(String _username, String _password){
		

	var PreparedStatement stmt = c.prepareStatement("SELECT * FROM user
 		WHERE username= ? and password= ?") 
 		
 		stmt.setString(1, _username)
		stmt.setString(2, _password)
		val rs = stmt.executeQuery
		rs.next
		
		new User() => [
			username = rs.getString("username")
			name = rs.getString("name")
			surname = rs.getString("surname")
			dni = rs.getInt("dni")
			email = rs.getString("email")
		]
		
	}
	
	def consulta(int id_usuarioLogueado){
		var PreparedStatement stmt = c.prepareStatement("SELECT * FROM ((((download LEFT JOIN 
          file ON file.id = download.file_id )LEFT JOIN document 
    ON file.id = document.file_id)  LEFT JOIN music ON file.id=music.file_id) 
      LEFT JOIN accion ON download.accion_id = accion.id) WHERE download.user_id = ? ") 
 		
 		//todo lo que esta en download todo lo que tenga id-archivo.
 		//ademas todos los id_usuarios que esten en download 
 		stmt.setInt(1, id_usuarioLogueado)
 		
 		 
	 	val rs = stmt.executeQuery
		  rs.next
		 rs.getDouble("speed")
		 rs.getString("title")
		 rs.getString("file.type")
		 
	}
	
	new Download() => [
			username = rs.getString("username")
			name = rs.getString("name")
			surname = rs.getString("surname")
			dni = rs.getInt("dni")
			email = rs.getString("email")
		]
	
}


