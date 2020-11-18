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
import java.sql.SQLException
import ar.edu.unsam.tpdb.domain.Reproduction
import ar.edu.unsam.tpdb.domain.Category

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
	try {
		stmt.setString(1, _username)
		stmt.setString(2, _password)
		val rs = stmt.executeQuery
		rs.next

		new User() => [
			id = rs.getInt("id")
			username = rs.getString("username")
			name = rs.getString("name")
			surname = rs.getString("surname")
			dni = rs.getInt("dni")
			email = rs.getString("email")

		]

	} catch (SQLException e) {
		throw new BusinessException(e.message)
	}

}

def todasLasDescargasDe(int id_usuarioLogueado) {

	var PreparedStatement stmt = c.prepareStatement
	("SELECT * FROM ((((download
         LEFT JOIN file ON file.id = download.file_id)
          LEFT JOIN document ON file.id = document.file_id)  
           LEFT JOIN music ON file.id=music.file_id) 
          LEFT JOIN accion ON download.accion_id = accion.id)
          WHERE download.user_id = ? ")

	// todo lo que esta en download todo lo que tenga id-archivo.
	// ademas todos los id_usuarios que esten en download 
	stmt.setInt(1, id_usuarioLogueado)

	val rs = stmt.executeQuery

	var List<Download> downloads = new ArrayList()
	var List<Category> categories = new ArrayList()
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
				it.categories.add("description")
			]
			val _accion = new Accion() => [
				id = rs.getInt("id")
				type = rs.getString("type")
				date_init = rs.getString("date_init")
				date_end = rs.getString("date_end")

			] 
      var PreparedStatement stmt2 = c.prepareStatement
      
      ("SELECT description FROM category WHERE id IN (SELECT category_id 
         FROM category_has_archive c WHERE c.file_id = ? )")
           stmt2.setInt(1, _file.id)
	       val rs2 = stmt2.executeQuery
	       
	      while(rs2.next){
	      _file.categories.add(rs2.getString("description"))
	      	println(rs2.getString("desciption"))
	      } 
           
        
			downloads.add(new Download() => [
				id = rs.getInt("id")
				speed = rs.getDouble("speed")
				file = _file
				accion = _accion
			])
		
}}
catch (SQLException e) {
			throw new BusinessException(e.message)
		}
		downloads	
		//
	}
def todasReproduccionesDe(int id_usuarioLogueado) {
//
		var PreparedStatement stmt = c.prepareStatement
	("SELECT * FROM (((reproduction LEFT JOIN 
          file ON file.id = reproduction.file_id )
         LEFT JOIN video ON file.id=video.file_id) 
      LEFT JOIN accion ON reproduction.accion_id = accion.id) 
       WHERE reproduction.user_id = ? ")

 
		stmt.setInt(1, id_usuarioLogueado)

		val rs = stmt.executeQuery

		var List<Reproduction> reproductions = new ArrayList()

		try {
			while (rs.next) {
			 

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
				reproductions.add(new Reproduction() => [
					id = rs.getInt("id")
					os = rs.getString("os")
					 file = _file
					accion = _accion
				])
			}

		} catch (SQLException e) {
			throw new BusinessException(e.message)
		}
		reproductions
	}

	def modificar(User user) {

		var PreparedStatement stmt = c.prepareStatement("UPDATE user SET name = ?, surname  = ?,
        password  = ? , dni  = ?, email  = ? WHERE username = ? ")

		stmt.setString(1, user.name)
		stmt.setString(2, user.surname)
		stmt.setString(3, user.password)
		stmt.setInt(4, user.dni)
		stmt.setString(5, user.email)
		stmt.setString(6, user.username)

		val rs = stmt.executeQuery

		var PreparedStatement state = c.prepareStatement("COMMIT ")
		val rs2 = stmt.executeQuery
		println(user)

	}

	def borrarUser(User user) {

		var PreparedStatement stmt3 = c.prepareStatement("DELETE survey FROM survey INNER JOIN user ON survey.user_id= user.id WHERE user.id 
           IN (SELECT id FROM user WHERE username= ? )")

		stmt3.setString(1, user.username)
		val rs1 = stmt3.executeQuery

		var PreparedStatement stmt2 = c.prepareStatement("DELETE download FROM download INNER JOIN user ON download.user_id= user.id WHERE user.id 
           IN (SELECT id FROM user WHERE username= ? )")

		stmt2.setString(1, user.username)
		val rs2 = stmt2.executeQuery

		var PreparedStatement stmt = c.prepareStatement("DELETE * FROM user WHERE username = ? ")

		stmt.setString(1, user.username)
		val rs = stmt2.executeQuery

	}

}
