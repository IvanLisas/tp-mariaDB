package ar.edu.unsam.tpdb.formularios

import java.util.ArrayList
import java.sql.PreparedStatement
import ar.edu.unsam.tpdb.database.ConexionMariaDB
import java.sql.Connection

class CategoryQuery {
	ConexionMariaDB cx = new ConexionMariaDB()
	Connection c = cx.conectar()

	def getCategorysOf(int file_id) {
		val categories = new ArrayList
		var PreparedStatement categoryStmt = c.prepareStatement(
		"SELECT description FROM category WHERE id IN (SELECT category_id 
        		FROM category_has_archive c WHERE c.file_id = " + file_id + " )")

		val categoryResult = categoryStmt.executeQuery

		while (categoryResult.next) {
			categories.add(categoryResult.getString("description"))
		}
		categories
	}
}
