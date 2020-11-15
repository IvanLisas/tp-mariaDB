package ar.edu.unsam.tpdb.database

import java.sql.Connection
import java.sql.DriverManager
import java.sql.ResultSet
import java.sql.SQLException
import java.sql.Statement

class Conexion {
	Connection cx
	String db = "clientes"
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
		val Conexion c = new Conexion() // crea la conexion
		c.conectar() // se conecta
		val query = "SELECT * FROM clientes"
		val Statement stmt = c.cx.createStatement()
		val ResultSet rs = stmt.executeQuery(query)
		rs.next()
		rs.next()
//		println(rs.getString("apellido"))
		return (rs.getString("apellido"))

	}

}
