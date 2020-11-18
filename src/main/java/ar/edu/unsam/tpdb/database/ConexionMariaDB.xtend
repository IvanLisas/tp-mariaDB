package ar.edu.unsam.tpdb.database

import java.sql.Connection
import java.sql.DriverManager
import java.sql.ResultSet
import java.sql.SQLException
import java.sql.Statement
import ar.edu.unsam.tpdb.domain.User
import java.sql.PreparedStatement
import ar.edu.unsam.tpdb.formularios.UserQuery

class ConexionMariaDB {
	Connection cx
	String db = "mariadb"
	String url = "jdbc:mysql://localhost:3306/" + db
	String user = "root"
	String password = "1234"

	def Connection conectar() {
		try {
			Class.forName("org.mariadb.jdbc.Driver")
			cx = DriverManager.getConnection(url, user, password)
			println("Se establecio la conexion con la base de datos")
		} catch (ClassNotFoundException  | SQLException ex) {
			println("No se pudo establecer una conexion con la base de datos Error: " + ex)
		}
		return cx
	}

	def void desconectar() {
		try {
			cx.close()
		} catch (SQLException ex) {
			println("No se pudo desconectar de la base de datos Error: " + ex)
		}
	}

//	def static void main(String[] args) {
//		val ConexionMariaDB c = new ConexionMariaDB() // crea la conexion
//		c.conectar() // se conecta
//		
//		val consulta = (new UserQuery()).consulta(1) 	
//		println(consulta)
//
//	}
//	def static void main2(String[] args) {
//      val usuario = new User() => [ 
// 	name="Estefania" 
// 	username="JoacoArnedoV" 
// 	surname ="lalala"
// 	dni=39874450 
// 	email="lalallalala" 
// 	it.password="1212"
// 	 ] 
//		
//		val ConexionMariaDB c = new ConexionMariaDB() // crea la conexion
//		c.conectar() // se conecta
//		
//		val modificar = (new UserQuery()).modificar(usuario)
//		println(modificar)
//
//	}
def static void main(String[] args) {
	
       val usuario = new User() => [ 
 	name="Estefania" 
 	username="JoacoArnedoV" 
 	surname ="lalala"
 	dni=39874450 
 	email="lalallalala" 
 	it.password="1212"
 	 ] 
		
		val ConexionMariaDB c = new ConexionMariaDB() // crea la conexion
		c.conectar() // se conecta
		
	  (new UserQuery()).borrarUser(usuario)
	

	}

}
