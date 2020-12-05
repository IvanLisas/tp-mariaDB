package ar.edu.unsam.tpdb.formularios

import ar.edu.unsam.tpdb.database.ConexionMariaDB
import ar.edu.unsam.tpdb.domain.ActionsCount
import ar.edu.unsam.tpdb.domain.Reproduction
import java.sql.PreparedStatement
import java.sql.ResultSet
import java.util.List

class ReproductionQuery {
	ConexionMariaDB cx = new ConexionMariaDB()

	def searchReproductionOf(int user_id, FilterOrden filtros) {
		var c = cx.conectar();
		var PreparedStatement stmt = null;
		var ResultSet reproductionResult = null;
		var List<Reproduction> reproductions
		try {
			val query = "select * from (reproduction join file on file.id = reproduction.file_id
 					join action on action.id = reproduction.action_id
					inner join user on user.id = file.user_id) 
					where reproduction.user_id = " + user_id + new Filter().create(filtros.filtros) + ' ORDER BY ' +
				filtros.orden.column + ' ' + filtros.orden.orden

			stmt = c.prepareStatement(query)
			reproductionResult = stmt.executeQuery(query)
			reproductions = new Reproduction().reproductionsFactory(reproductionResult)

		} finally {
			if (reproductionResult !== null) {
				reproductionResult.close();
				println("cerrado")
			}

			if (stmt !== null) {
				stmt.close();
			}
			cx.desconectar(c)
		}
		reproductions
	}

}
