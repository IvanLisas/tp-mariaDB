package ar.edu.unsam.tpdb.formularios

import ar.edu.unsam.tpdb.database.ConexionMariaDB
import ar.edu.unsam.tpdb.domain.User
import ar.edu.unsam.tpdb.domain.Download
import ar.edu.unsam.tpdb.domain.File
import java.sql.Connection
import java.sql.PreparedStatement
import ar.edu.unsam.tpdb.domain.Accion
import java.time.LocalDateTime
import java.util.ArrayList
import java.util.List
import ar.edu.unsam.tpdb.domain.BusinessException

class UserQuery {

	Connection c = new ConexionMariaDB().conectar()

	def insertUser(User user) {
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

	def loginUser(String _username, String _password) {

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

	def consulta(int id_usuarioLogueado) {

		var PreparedStatement stmt = c.prepareStatement("SELECT * FROM ((((download LEFT JOIN 
          file ON file.id = download.file_id )LEFT JOIN document 
    ON file.id = document.file_id)  LEFT JOIN music ON file.id=music.file_id) 
      LEFT JOIN accion ON download.accion_id = accion.id) WHERE download.user_id = ? ")

		// todo lo que esta en download todo lo que tenga id-archivo.
		// ademas todos los id_usuarios que esten en download 
		stmt.setInt(1, id_usuarioLogueado)

		val rs = stmt.executeQuery

		var List<Download> downloads = new ArrayList()

		try {
			while (rs.next) {
				rs.getDouble("speed")
				rs.getString("title")
				rs.getString("file.type")

				val _file = new File() => [
					id = rs.getInt("id")
					title = rs.getString("title")
					extension_type = rs.getString("extension_type")
					type = rs.getString("type")
					publish_date = rs.getString("publish_date")

				]

				val _accion = new Accion() => [
					id = rs.getInt("id")
					type = rs.getString("type")
					date_init = rs.getString("date_init")
					date_end = rs.getString("date_end")

				]
				val _download = new Download() => [
					id = rs.getInt("id")
					speed = rs.getDouble("speed")
					file = _file
					accion = _accion
				]
				println(_download)

				 downloads.add(_download)

			}
		} catch (BusinessException e) {
			 
		}downloads
    
	}
	
	def modificar(User user ) {
      
		var PreparedStatement stmt = c.prepareStatement
		("UPDATE user SET name = ?, surname  = ?,
        password  = ? , dni  = ?, email  = ? WHERE username = ? ")
      
		
		stmt.setString(1, user.name)
		stmt.setString(2, user.surname)
		stmt.setString(3, user.password)
		stmt.setInt(4, user.dni)
		stmt.setString(5, user.email)
		stmt.setString(6, user.username)
		 

		val rs = stmt.executeQuery
 
		var PreparedStatement state = c.prepareStatement
		("COMMIT ")
      	val rs2 = stmt.executeQuery
        println(user)
  
 
	}
	
	def borrarUser(User user ) {
      
           var PreparedStatement stmt3 = c.prepareStatement
        ("DELETE survey FROM survey INNER JOIN user ON survey.user_id= user.id WHERE user.id 
           IN (SELECT id FROM user WHERE username= ? )")
           
           stmt3.setString(1, user.username)
          val rs1= stmt3.executeQuery
          
      var PreparedStatement stmt2 = c.prepareStatement
		  ("DELETE download FROM download INNER JOIN user ON download.user_id= user.id WHERE user.id 
           IN (SELECT id FROM user WHERE username= ? )")
           stmt2.setString(1, user.username)
		  val rs2= stmt2.executeQuery
		  
       var PreparedStatement stmt = c.prepareStatement
		("DELETE FROM user WHERE username = ? ")
		
		   stmt.setString(1, user.username)
           val rs= stmt.executeQuery
		 
  
 
	}
	
	
}
