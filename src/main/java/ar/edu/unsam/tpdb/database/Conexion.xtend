package ar.edu.unsam.tpdb.database

import java.sql.Connection
import java.sql.DriverManager
import java.sql.ResultSet
import java.sql.SQLException
import java.sql.Statement
import ar.edu.unsam.tpdb.domain.User
import java.sql.PreparedStatement

class Conexion {
	Connection cx
	String db = "mariadb"
	String url = "jdbc:mysql://localhost:3306/" + db
	String user = "root"
	String password = "1234"

	def Connection conectar() {
		try {
			Class.forName("org.mariadb.jdbc.Driver")
			cx = DriverManager.getConnection(url, user, password)
			println("Se conecto")
		} catch (ClassNotFoundException  | SQLException ex) {
			println("No se conecto " + ex)
		}
		return cx
	}

	def void desconectar() {
		try {
			cx.close()
		} catch (SQLException ex) {
			println("No se pudo desconectar " + ex)
		}
	}

	def static void main(String[] args) {
		val Conexion c = new Conexion() // crea la conexion
		c.conectar() // se conecta
	}

	def consulta() {
//		val Conexion c = new Conexion() 
//		c.conectar()
		val query = "SELECT * FROM user"
		val Statement stmt = conectar().createStatement()
		val ResultSet rs = stmt.executeQuery(query)

		rs.next()
		println(rs)
//		println(rs.getString("apellido"))
		return (rs.getString("username"))

	}

	def crearUsuario() {
		var PreparedStatement stmt = conectar.prepareStatement("INSERT INTO user
 		(`name`, `surname`, `username`, `password`, `dni`, `email`) 
		VALUES (?, ?, ?, ?, ?, ?)")
		stmt.setString(1, 'Nombre del usuario')
		stmt.setString(2, 'Apellio del usuario')
		stmt.setString(3, 'username ')
		stmt.setString(4, 'Contraseña')
		stmt.setInt(5, 123456)
		stmt.setString(6, 'asds')
		
		stmt.executeUpdate
	}

}
