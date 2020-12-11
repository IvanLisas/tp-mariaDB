package ar.edu.unsam.tpdb.formularios

import ar.edu.unsam.tpdb.database.ConexionMariaDB
import java.sql.PreparedStatement
import java.sql.ResultSet
import java.util.List
import ar.edu.unsam.tpdb.domain.File

class FileQuery {
	ConexionMariaDB cx = new ConexionMariaDB()

	def searchFiles(String keyword) {
		var c = cx.conectar();

		var PreparedStatement stmt = null;
		var ResultSet rs = null;

		var List<File> files
		try {
			val query = 'select * from (file join user on user.id = file.user_id) 
						where title like "%' + keyword + '%"  
						limit 29  offset 0  '
			println(query)
			stmt = c.prepareStatement(query)
			rs = stmt.executeQuery()
			files = new File().fileFactoryList(rs)
			files
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
