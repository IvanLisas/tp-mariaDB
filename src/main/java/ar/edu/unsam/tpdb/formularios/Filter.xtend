package ar.edu.unsam.tpdb.formularios

import java.sql.ResultSet
import java.util.ArrayList
import java.util.HashMap
import java.util.List
import org.eclipse.xtend.lib.annotations.Accessors

@Accessors
class FilterOrden{
	List<Filtro> filtros
	Orden orden
	int limit
	int offset
}

@Accessors
class Filtro {
	String filtro
	String keyword
}

@Accessors
class Orden{
	String column
	String orden
}

class Filter {

	def byAscFileName() { ' ORDER BY file.title ASC' }

	def byDesFileName() { ' ORDER BY file.title DESC' }

	def byFileName(String filtro, String keyword) {
		' and ' + filtro + ' like "%' + keyword + '%"'
	}

	def create(List<Filtro> filtros) {
		val resultado = filtros.map[byFileName(it.filtro, it.keyword)]
		val str = String.join("", resultado);
		str
	}
}