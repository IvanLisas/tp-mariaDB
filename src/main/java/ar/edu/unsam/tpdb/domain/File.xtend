package ar.edu.unsam.tpdb.domain

import org.eclipse.xtend.lib.annotations.Accessors
import java.util.List
import java.util.ArrayList
import java.sql.ResultSet
import ar.edu.unsam.tpdb.formularios.CategoryQuery

@Accessors
class File {
	int id
	String title
	String extension_type
	String type
	String publish_date
	String autor
	List<String> categories = new ArrayList()
	String thumbnail

	def fileFactory(ResultSet actionResult) {
		val _file = new File() => [
			id = actionResult.getInt("file.id")
			title = actionResult.getString("title")
			extension_type = actionResult.getString("extension_type")
			type = actionResult.getString("type")
			publish_date = actionResult.getString("publish_date")
			autor = actionResult.getString("user.username")
			thumbnail = actionResult.getString("thumbnail")
		]
		_file.categories = new CategoryQuery().getCategorysOf(_file.id)
		_file
	}

	def fileFactoryList(ResultSet rs) {
		var List<File> files = new ArrayList()

		while (rs.next) {
			files.add(fileFactory(rs))
		}
		files
	}

}
