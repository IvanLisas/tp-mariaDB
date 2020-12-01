package ar.edu.unsam.tpdb.formularios

import java.sql.Connection
import ar.edu.unsam.tpdb.database.ConexionMariaDB
import java.sql.PreparedStatement
import ar.edu.unsam.tpdb.domain.Download
import java.util.List
import java.util.ArrayList
import ar.edu.unsam.tpdb.domain.File
import java.sql.ResultSet
import ar.edu.unsam.tpdb.domain.Reproduction

class ReproductionQuery {
	ConexionMariaDB cx = new ConexionMariaDB()
	Connection c = cx.conectar()

// Todas las descargas
	def allReproductionsOf(int user_id, String filter) {

		val query = "select * from (reproduction join file on file.id = reproduction.file_id
 					join action on action.id = reproduction.action_id) 
					where reproduction.user_id = " + user_id + filter

		var stmt = c.createStatement()
		val reproductionResult = stmt.executeQuery(query)

		new Reproduction().reproductionsFactory(reproductionResult)
	}

// Busqueda
	def searchReproductionsOf(int user_id, String keyword) {
		allReproductionsOf(user_id, new Filter().byFileName(keyword))
	}

// Filtros
	def reproductionsByAscName(int user_id) { searchReproductionsOf(user_id, new Filter().byAscFileName) }

	def reproductionsByDesName(int user_id) { searchReproductionsOf(user_id, new Filter().byDesFileName) }


}
