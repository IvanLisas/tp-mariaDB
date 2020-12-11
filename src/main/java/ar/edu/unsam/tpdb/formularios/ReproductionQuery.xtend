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
		var ResultSet rs = null;
		var List<Reproduction> reproductions
		try {
			val query = "select * from (reproduction 
					join file on file.id = reproduction.file_id
 					join action on action.id = reproduction.action_id
					inner join user on user.id = file.user_id) 
					where reproduction.user_id = " + user_id + filtros.create() + ' ORDER BY ' + filtros.orden.column +
				' ' + filtros.orden.direction + ' limit ' + filtros.limit + ' offset ' + filtros.offset
			println(query)
			stmt = c.prepareStatement(query)
			rs = stmt.executeQuery(query)
			reproductions = new Reproduction().reproductionsFactory(rs)

		} finally {
			if (rs !== null) {
				rs.close();
				println("cerrado")
			}

			if (stmt !== null) {
				stmt.close();
			}
			cx.desconectar(c)
		}
		reproductions
	}

	def mostUsedOs(int user_id) {
		var c = cx.conectar();
		var PreparedStatement stmt = null;
		var ResultSet rs = null;
		try {
			val query = 'SELECT os,  MAX(osCount)
 			FROM (SELECT os, COUNT(os) as osCount from reproduction
 			where user_id = '+ user_id+ ' GROUP BY os) AS newTable'
			stmt = c.prepareStatement(query)
			rs = stmt.executeQuery()
			rs.next
			rs.getString("os")
		} finally {
			if (rs !== null) {
				rs.close();
				println("cerrado")
			}

			if (stmt !== null) {
				stmt.close();
			}
			cx.desconectar(c)
		}

	}

}
