package ar.edu.unsam.tpdb.formularios

import java.util.ArrayList
import java.sql.PreparedStatement
import ar.edu.unsam.tpdb.database.ConexionMariaDB
import java.sql.Connection
import java.sql.ResultSet

class CategoryQuery {
	ConexionMariaDB cx = new ConexionMariaDB()

	def getCategorysOf(int file_id) {
		var c = cx.conectar()
		var PreparedStatement stmt = null
		var ResultSet categoryResult = null
		val categories = new ArrayList

		try {
			val query = "SELECT description FROM category WHERE id IN (SELECT category_id 
        		FROM category_has_archive c WHERE c.file_id = " + file_id + " )"

			stmt = c.prepareStatement(query)
			categoryResult = stmt.executeQuery(query)

			while (categoryResult.next) {
				categories.add(categoryResult.getString("description")) 
			}

		} finally {

			if (categoryResult !== null) {

				categoryResult.close();
				println("cerrado")
			}
			if (stmt !== null) {
				stmt.close();
			}
			cx.desconectar(c)
		}
		categories
	}
}
